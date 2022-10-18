import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './utils/axios.js'
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
// 主界面（组装页面）分为上 中 下
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
reportWebVitals();
