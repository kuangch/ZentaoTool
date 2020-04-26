/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2019/5/22
 * ======================================== */
import Reg from '../utils/regular'

function changePathURL(d) {
    try{
        for(let key in d){
            // pass_info为独立一条记录
            if(/^(pass_info)$/.test(key))
                changePathURL(d[key])

            if(/(model_path|texture_path|material_path|photo_path|_2d_camera_best_frame_path|use_best_frame_path)$/.test(key))
                d[key] = d[key].replace(Reg.rawDataPath, '/raw_data')
        }
    }catch (e){
        console.error(e)
    }
}

export function handURL(data){
    if(data && data.data){
        if (data.data instanceof Array){
            for(let d of data.data){
                changePathURL(d)
            }
        }else{
            changePathURL(data.data)
        }
        return data
    }
}
