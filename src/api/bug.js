import axios from 'axios'
import throttle from '../utils/throttle';
// 获取文章,需要携带当前显示的总条数
export  const postbug= throttle((data) =>{
    return axios.post('/bug',data)
  },300) ;



