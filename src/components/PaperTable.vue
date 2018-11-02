<template>
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="paper_name"
                label="文章名称"
                width="600"
        >
        </el-table-column>
        <el-table-column
                prop="paper_author"
                label="作者"
                sortable
                width="300">
        </el-table-column>
        <el-table-column
                prop="paper_date"
                label="年份"
                sortable
        >
        </el-table-column>
        <el-table-column
                prop="paper_journal"
                label="期刊"
        >
        </el-table-column>
        <el-table-column
                prop="paper_catalog"
                label="分类"
                :filters="[{ text: '分类1', value: '分类1' }, { text: '分类2', value: '分类2' }, { text: '分类3', value: '分类3' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                        :type="scope.row.tag === '分类1' ? 'primary' : 'success'"
                        disable-transitions>{{scope.row.paper_catalog}}
                </el-tag>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {DATABASE} from '../data/data'

    export default {
        name: 'PaperTable',
        data() {
            return {
                tableData: DATABASE
            }
        },
        methods: {
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }
        }
    }
</script>

<style scoped>

</style>