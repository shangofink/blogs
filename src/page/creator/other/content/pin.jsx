import { Button } from 'antd'
import Search from 'antd/lib/input/Search';
import './pin.less'

export default function ContentPin(props){
  return(
    <div className='Content-article'>
      <div className="content-article-top">
        <div>
          <Button className={'btn topsel'} >沸点总览</Button>
        </div>
        <Search className='search' placeholder="input search text" maxLength='10' enterButton />
      </div>
      <div className='content-article-main'>
        pin
      </div>
    </div>
  )
}