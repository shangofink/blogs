import { Button } from 'antd'
import { useState } from 'react'
import './block.less'
export default function Block(){
  const [sel,setSel]=useState('author')

  return(
    <div className="Block">
      <div className="block-top">
        <Button className={sel==='author'?'btn-sel':''} onClick={()=>{setSel('author')}}>屏蔽作者</Button>
        <Button className={sel==='tag'?'btn-sel':''} onClick={()=>{setSel('tag')}}>屏蔽标签</Button>
      </div>
      <div className='block-bottom'>

      </div>
    </div>
  )
}