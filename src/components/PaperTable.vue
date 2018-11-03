<template>
    <el-table
            :data="papers"
            stripe
            border
            style="width: 100%">
        <el-table-column
                type="index"
        >
        </el-table-column>
        <el-table-column
                prop="paper_name"
                label="文章名称"
                sortable
        >
        </el-table-column>
        <el-table-column
                prop="paper_author"
                label="作者"
                sortable>
        </el-table-column>
        <el-table-column
                prop="paper_date"
                label="年份"
                width="80"
                sortable
        >
        </el-table-column>
        <el-table-column
                prop="paper_journal"
                label="期刊"
                width="150"
                sortable
        >
        </el-table-column>
        <el-table-column
                prop="paper_catalog"
                label="分类"
                :filters="generateTags()"
                :filter-method="filterTag"
                filter-placement="bottom-end"
                width="200"
        >
            <template slot-scope="scope">
                <el-tag v-for="item in scope.row.paper_catalog_generated" :key="item"
                        type="primary"
                        style="margin:0 5px 5px 0"
                        disable-transitions>
                    {{item}}
                </el-tag>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: 'PaperTable',
        data() {
            return {
                papers: this.$store.getters.papers,
                catalogs: this.$store.getters.catalogs,
            }
        },
        created() {
        },
        methods: {
            generateTags() {
                return Array.from(this.$data.catalogs, (item) => {
                    let tmp = [];
                    tmp.value = item;
                    tmp.text = item;
                    return tmp;
                });
            },
            filterTag(value, row) {
                return row.paper_catalog_generated.indexOf(value) > -1;
            },
        }
    }
</script>

<style scoped>

</style>