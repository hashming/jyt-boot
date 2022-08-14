// Copyright [2019] [patientdesperate@gmail.com]

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import getParamsToken from './token';
import axios from 'axios';
import config from '../../config/config'


var ajax = axios.create({
  baseURL: 'https://wechat.benmu-health.com/mobile/wx/',
  timeout: 1000,
  headers: config.headers,
  withCredentials: true,
});

// 添加请求拦截器 在发送请求之前做些什么
ajax.interceptors.request.use(request => {
  var d1 = +new Date;
  if (!request.params) {
      request.params = {};
  }
  request.params._ = d1;
  if (config.tokenUrls.indexOf(request.url) !== -1) {
    console.log("当前请求的url为：" + request.url);
    console.log("当前请求的参数为："+request.params)
    var sendOpts = getParamsToken({
        url: request.url,
        type: request.method,
      //我觉得你写的还行，你觉得呢小宝贝
      //加油啊！！！
      //干巴爹！！！
      //好久没有玩电脑了，都不会打字了，呜呜呜~
        data: request.params
    });
    console.log("处理之后当前请求的url为：" + sendOpts.url);
    console.log("处理之后当前请求的参数为："+sendOpts.data)
    request.url = sendOpts.url;
    request.params = sendOpts.data;
  }
  console.info('Requesting: ', request)
  return request;
}, function(error) {
  console.error('request_error', error)
  return Promise.reject(error);
})

ajax.interceptors.response.use(response => {
  // console.log('Response:', response.data)
  if (response.data.resCode !== 0) {
    return Promise.reject(response.data)
  }
  return response;
})

export default ajax