<template>
    <div>
        <el-table
                :data="tableLists"
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
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalItems"
                style="margin-top:20px;"
                >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'PaperTable',
        data() {
            return {
                papers: this.$store.getters.papers,
                catalogs: this.$store.getters.catalogs,
                tableDataName: "",
                tableLists: [],
                currentPage: 1,
                pageSize: 5,
                totalItems: 0,
            }
        },
        created() {
            this.totalItems = this.papers.length;
            if (this.totalItems > this.pageSize) {
                for (let index = 0; index < this.pageSize; index++) {
                    this.tableLists.push(this.papers[index]);
                }
            } else {
                this.tableLists = this.papers;
            }
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
            handleSizeChange(val) {
                this.pageSize = val;
                this.handleCurrentChange(this.currentPage);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.refreshCurrentPage(this.papers)
            },
            //组件自带监控当前页码
            refreshCurrentPage(list) {
                let from = (this.currentPage - 1) * this.pageSize;
                let to = this.currentPage * this.pageSize;
                this.tableLists = [];
                for (; from < to; from++) {
                    if (list[from]) {
                        this.tableLists.push(list[from]);
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>