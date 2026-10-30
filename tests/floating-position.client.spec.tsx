import {cleanup, fireEvent, render, screen, waitFor, act} from '@testing-library/react'
import {afterEach, expect, it, vi} from 'vitest'
import {createModelPickerService} from '../src/model-picker-service.tsx'
import {RecentModels} from '../src/recent-models.ts'
import {recentLocales} from '../src/recent-locales.ts'
import {createSnapshotStore} from '@deepseek-ai/dsh-client-store'
import {ModelSelect} from '../src/ModelSelect.tsx'
import {zh} from './fixtures/model-locales.ts'

const floating=vi.hoisted(()=>({cleanup:vi.fn(),updates:[] as Array<()=>void>,pending:[] as Array<(position:{x:number;y:number})=>void>}))
vi.mock('@floating-ui/dom',()=>({
  offset:vi.fn(),shift:vi.fn(),
  autoUpdate:vi.fn((_anchor,_panel,update,options)=>{expect(options.animationFrame).toBe(false);floating.updates.push(update);update();return floating.cleanup}),
  computePosition:vi.fn(()=>new Promise(resolve=>floating.pending.push(resolve))),
}))
afterEach(()=>{cleanup();vi.clearAllMocks();floating.pending=[];floating.updates=[]})
it('floating tracking stops on close and stale coordinates cannot overwrite a reopened menu', async()=>{
  const recents=new RecentModels(undefined,async()=>Response.json({ok:true,records:[]}))
  const ctx={locale:{bind:()=>key=>zh[key]??key},modelDirectories:{directoryFor:vi.fn()}}
  const {CatalogPicker}=createModelPickerService(ctx,recents,key=>recentLocales.zh[key])
  const view=render(<CatalogPicker groups={[]} current={null} locked={false} load={()=>{}} select={()=>true}/>)
  const trigger=screen.getByRole('button')
  fireEvent.click(trigger)
  await waitFor(()=>expect(floating.pending.length).toBe(1))
  fireEvent.keyDown(screen.getByRole('menu',{hidden:true}),{key:'Escape'})
  expect(floating.cleanup).toHaveBeenCalledTimes(1)
  fireEvent.click(trigger)
  await waitFor(()=>expect(floating.pending.length).toBe(2))
  await act(async()=>floating.pending[1]({x:40,y:50}))
  expect(screen.getByRole('menu').style.left).toBe('40px')
  await act(async()=>floating.pending[0]({x:900,y:900}))
  expect(screen.getByRole('menu').style.left).toBe('40px')
  await act(async()=>floating.updates[1]())
  await act(async()=>floating.updates[1]())
  await act(async()=>floating.pending[3]({x:60,y:70}))
  await act(async()=>floating.pending[2]({x:100,y:100}))
  expect(screen.getByRole('menu').style.left).toBe('60px')
  view.unmount()
  expect(floating.cleanup).toHaveBeenCalledTimes(2)
  recents.dispose()
})

it('availability loss stops tracking and restoring the control binds its new elements', async()=>{
  const directory=createSnapshotStore({status:'ready',error:null,failures:[],current:null,routable:true,pending:null,groups:[]})
  const props={locked:false,directory,load:()=>{},select:async()=>true,t:key=>zh[key]??key}
  const view=render(<ModelSelect {...props} available />)
  fireEvent.click(screen.getByRole('button'))
  await waitFor(()=>expect(floating.pending.length).toBe(1))
  view.rerender(<ModelSelect {...props} available={false} />)
  expect(floating.cleanup).toHaveBeenCalledTimes(1)
  expect(screen.queryByRole('menu',{hidden:true})).toBeNull()
  view.rerender(<ModelSelect {...props} available />)
  await waitFor(()=>expect(floating.pending.length).toBe(2))
  await act(async()=>floating.pending[1]({x:30,y:40}))
  await act(async()=>floating.pending[0]({x:900,y:900}))
  expect(screen.getByRole('menu').style.top).toBe('40px')
  view.unmount()
  expect(floating.cleanup).toHaveBeenCalledTimes(2)
})
