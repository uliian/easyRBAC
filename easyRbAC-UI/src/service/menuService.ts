import axios from '../myAxios'
import {Config} from './baseConfig'
import {resourceService} from './resourceService'

interface MenuItem{
    id:String,
    name:string,
    path:string
    children:MenuItem[]
}

export let menuService = {
    async getMenus() {
        let url = `${Config.BaseUrl}/easyRBAC/login/userMenu`;
        let httpResult = await axios.get(url)
        let resources = httpResult.data;
        resourceService.ergodicTree(resources,(x:any)=>{
            x.id = x.id;
            x.name = x.resourceName;
            x.path = x.url;
            x.children = x.children
        })
        return resources;
        // let result = [
        //     {
        //         id:"1",
        //         name: '用户',               
        //         children: [
        //             {
        //                 id:"10",
        //                 name:"用户管理",
        //                 path:"/user"
        //             },
        //             {
        //                 id:"11",
        //                 name: '用户资源管理',
        //                 path: '/user/resource'
        //             }
        //         ]             
        //     },
        //     {
        //         id:"3",
        //         name: '角色',
        //         children: [
        //             {
        //                 id:"9",
        //                 name:"角色管理",
        //                 path:"/role"
        //             },
        //             {
        //                 id:"4",
        //                 name: '角色资源管理',
        //                 path: '/role/roleResource'
        //             },{
        //                 id:"15",
        //                 name:"用户角色管理",
        //                 path:'/role/user'
        //             }
        //         ]
        //     },
        //     {
        //         id:"5",
        //         name: '应用',
        //         path: '/app',
        //         children: [
        //             {
        //                 id:"12",
        //                 name:"应用管理",
        //                 path:'/application'
        //             },
        //             {
        //                 id:"6",
        //                 name: '应用资源管理',
        //                 path: '/app/resource'
        //             }
        //         ]
        //     },{
        //         id:"16",
        //         name:"负责人管理",
        //         path:"/manager",
        //         children:[
        //             {
        //                 id:"17",
        //                 name:"负责人权限管理",
        //                 path:"/manager"
        //             },{
        //                 id:"18",
        //                 name:"人员授权",
        //                 path:"/manager/userAuthorization"
        //             }
        //         ]
        //     }
        // ]

        //return result;
    }
}