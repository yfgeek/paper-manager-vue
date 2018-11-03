import {DATABASE} from "../data/data";

export const DATABASE_UPDATE = 'DATABASE_UPDATE';

const state = {
    list: transformList(DATABASE),
};

const getters = {
    papers: state => state.list,
    catalogs: (state) =>  getCatalogsFromList(state.list),
    // 通过文献名查找
    paperByName: (state) => (paperName) => state.papers.find(item => item.paper_name === paperName),
};

const mutations = {
    [DATABASE_UPDATE](state, payload) {
        state.list = transformList(DATABASE)
    },
};

function transformList(list){
    return Array.from(list, (item)=>{
        let tmp = item;
        tmp.paper_catalog_generated = item.paper_catalog.split(',');
        return tmp;
    })
}

// 从列表中提取分类
function getCatalogsFromList(list){
    let tmp = new Set();
    list.map((item) => {
        let multiCatalog = item.paper_catalog_generated;
        multiCatalog.length > 1 ?
            multiCatalog.map(item => tmp.add(item)) :
            tmp.add(multiCatalog[0]);
    });
    return tmp;
}

export default{
    state,
    getters,
    mutations
}
