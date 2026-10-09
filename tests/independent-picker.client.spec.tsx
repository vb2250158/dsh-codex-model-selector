import {cleanup, fireEvent, render, screen, waitFor, within} from '@testing-library/react'
import {afterEach, expect, it, vi} from 'vitest'
import {createSnapshotStore} from '@deepseek-ai/dsh-client-store'
import {createModelPickerService} from '../src/model-picker-service.tsx'
import {RecentModels} from '../src/recent-models.ts'
import {recentLocales} from '../src/recent-locales.ts'
import {zh} from './fixtures/model-locales.ts'

afterEach(cleanup)
it('独立补齐选择复用可见目录和常用记录，不切换会话模型', async()=>{
  const store=createSnapshotStore({status:'ready',error:null,failures:[],current:{provider:'api',model:'main'},routable:true,pending:null,
    groups:[{id:'api',name:'Provider A',models:[{id:'main',name:'Main Model'},{id:'small',name:'Small Model'}]}]})
  const mainSelect=vi.fn(),load=vi.fn(async()=>store.getSnapshot()),select=vi.fn()
  const recents=new RecentModels(undefined,async()=>Response.json({ok:true,records:[{provider:'api',model:'small',time:Date.now(),purpose:'assistant'}]}))
  const ctx={locale:{bind:()=>key=>zh[key]??key},modelDirectories:{directoryFor:()=>({store,load,select:mainSelect})}}
  const {Picker}=createModelPickerService(ctx,recents,key=>recentLocales.zh[key])
  render(<Picker sessionId="synthetic" current={{provider:'api',model:'main'}} locked={false} select={select}/>)
  const trigger=screen.getByRole('button')
  fireEvent.click(trigger)
  expect(screen.getByRole('dialog')).toBeTruthy()
  const search=screen.getByRole('searchbox')
  expect(document.activeElement).toBe(search)
  await waitFor(()=>expect(within(screen.getByRole('group',{name:'常用模型'})).getByRole('menuitemradio',{name:/Small Model/})).toBeTruthy())
  expect(within(screen.getByRole('group',{name:'常用模型'})).getByRole('menuitemradio',{name:/Small Model/}).textContent).toContain('Provider A')
  fireEvent.change(search,{target:{value:'Small'}})
  await waitFor(()=>expect(screen.queryByRole('menuitemradio',{name:'Main Model'})).toBeNull())
  fireEvent.click(screen.getByRole('menuitemradio',{name:'Small Model'}))
  await waitFor(()=>expect(select).toHaveBeenCalledWith({provider:'api',model:'small'}))
  expect(mainSelect).not.toHaveBeenCalled()
  expect(store.getSnapshot().current.model).toBe('main')
  expect(load).toHaveBeenCalled()
  expect(screen.queryByRole('dialog')).toBeNull()
  await waitFor(()=>expect(document.activeElement).toBe(trigger))
  fireEvent.click(trigger)
  fireEvent.change(screen.getByRole('searchbox'),{target:{value:'Provider A'}})
  await waitFor(()=>expect(screen.getByRole('menuitemradio',{name:'Main Model'})).toBeTruthy())
  fireEvent.keyDown(screen.getByRole('searchbox'),{key:'Escape'})
  expect(screen.queryByRole('dialog')).toBeNull()
  expect(select).toHaveBeenCalledTimes(1)
  recents.dispose()
})
