import request from '@/router/axios';
import {Loading, Message} from 'element-ui';

export default {

    /**
     * 下载导出Excel
     * @param url 后端请求地址
     * @param method 请求方法
     * @param responseType 相应类型
     * @param data
     * @returns {PromiseLike<T>}
     */
    downLoadExcel(url, method, responseType, data) {
        const loading = Loading.service({
            lock: true,
            text: '组织数据中,请稍后...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
        });
        request({
            url: url,
            method: method,
            data: data,
            responseType: responseType,
        }).then(res => {
            if (res.status === 200) {
                let fileName = decodeURI(res.headers['content-disposition'].split('=')[1])
                const blob = new Blob([res.data]);
                // const blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink)
                loading.close();
                Message({
                    type: "success",
                    message: "导出成功!"
                });
            }
        }).catch(err => {
            loading.close();
            Message({
                type: "error",
                message: "下载出错!"
            })
        })
    },
    download(arraybufferData, name = '注册用户') {
        const a = document.createElement('a');
        const blob = new Blob([arraybufferData], {});

        function createObjectURL(object) {
            return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object)
        }

        a.href = createObjectURL(blob); // xhr.response is a blob
        a.download = `${name}.xls`; // Set the file name.
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click(); // 开始下载
        a.remove(); // 移除
    }
}