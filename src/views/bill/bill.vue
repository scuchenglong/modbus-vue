<template>
    <basic-container>
        <avue-crud :before-open="beforeOpen"
                   :data="data"
                   :option="option"
                   :page="page"
                   :permission="permissionList"
                   :table-loading="loading"
                   @current-change="currentChange"
                   @on-load="onLoad"
                   @refresh-change="refreshChange"
                   @row-del="rowDel"
                   @row-save="rowSave"
                   @row-update="rowUpdate"
                   @search-change="searchChange"
                   @search-reset="searchReset"
                   @selection-change="selectionChange"
                   @size-change="sizeChange"
                   ref="crud"
                   v-model="form">
            <template slot="menuLeft">
                <el-button @click="handleDelete"
                           icon="el-icon-delete"
                           plain
                           size="small"
                           type="danger"
                           v-if="permission.bill_delete">删 除
                </el-button>
            </template>
            <template slot="menuLeft">
                <el-button @click="downloadAllExcel"
                           icon="el-icon-plus"
                           plain
                           size="small"
                           type="success"
                           v-if="permission.bill_delete">全部导出
                </el-button>
            </template>
            <template slot="category"
                      slot-scope="{row}">
                <el-tag>{{row.categoryName}}</el-tag>
            </template>
        </avue-crud>
    </basic-container>
</template>

<script>
    import AvueUeditor from 'avue-plugin-ueditor';
    import {getList, getDetail, add, update, remove, downloadExcel} from "@/api/bill/bill";
    import {mapGetters} from "vuex";

    export default {
        comments: {
            AvueUeditor
        },
        data() {
            return {
                form: {},
                query: {},
                loading: true,
                page: {
                    pageSize: 10,
                    currentPage: 1,
                    total: 0
                },
                selectionList: [],
                option: {
                    height: 'auto',
                    calcHeight: 30,
                    tip: false,
                    searchShow: true,
                    searchMenuSpan: 6,
                    border: true,
                    index: true,
                    viewBtn: true,
                    selection: true,
                    dialogClickModal: false,
                    column: [
                        {
                            label: "主题",
                            prop: "title",
                            rules: [{
                                required: true,
                                message: "请输入主题",
                                trigger: "blur"
                            }]
                        },

                        {
                            label: "客户名称",
                            prop: "customerName",
                            rules: [{
                                required: true,
                                message: "请输入客户名称",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "收入",
                            prop: "moneyIn",
                            rules: [{
                                required: true,
                                message: "请输入金额（收入）",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "支出",
                            prop: "moneyOut",
                            rules: [{
                                required: true,
                                message: "请输入金额（支出）",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "备注",
                            prop: "content",
                            span: 24,
                            minRows: 6,
                            type: 'textarea',
                            rules: [{
                                required: true,
                                message: "请输入备注",
                                trigger: "blur"
                            }]
                        },
                    ]
                },
                data: []
            };
        },
        computed: {
            ...mapGetters(["permission"]),
            permissionList() {
                return {
                    addBtn: this.vaildData(this.permission.bill_add, false),
                    viewBtn: this.vaildData(this.permission.bill_view, false),
                    delBtn: this.vaildData(this.permission.bill_delete, false),
                    editBtn: this.vaildData(this.permission.bill_edit, false)
                };
            },
            ids() {
                let ids = [];
                this.selectionList.forEach(ele => {
                    ids.push(ele.id);
                });
                return ids.join(",");
            }
        },
        methods: {
            downloadAllExcel(row) {
                this.$confirm("确定全部导出?", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    downloadExcel(row);
                })
            },
            rowSave(row, loading, done) {
                add(row).then(() => {
                    loading();
                    this.onLoad(this.page);
                    this.$message({
                        type: "success",
                        message: "操作成功!"
                    });
                }, error => {
                    done();
                    console.log(error);
                });
            },
            rowUpdate(row, index, loading, done) {
                update(row).then(() => {
                    loading();
                    this.onLoad(this.page);
                    this.$message({
                        type: "success",
                        message: "操作成功!"
                    });
                }, error => {
                    done();
                    console.log(error);
                });
            },
            rowDel(row) {
                this.$confirm("确定将选择数据删除?", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        return remove(row.id);
                    })
                    .then(() => {
                        this.onLoad(this.page);
                        this.$message({
                            type: "success",
                            message: "操作成功!"
                        });
                    });
            },
            handleDelete() {
                if (this.selectionList.length === 0) {
                    this.$message.warning("请选择至少一条数据");
                    return;
                }
                this.$confirm("确定将选择数据删除?", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        return remove(this.ids);
                    })
                    .then(() => {
                        this.onLoad(this.page);
                        this.$message({
                            type: "success",
                            message: "操作成功!"
                        });
                        this.$refs.crud.toggleSelection();
                    });
            },
            beforeOpen(done, type) {
                if (["edit", "view"].includes(type)) {
                    getDetail(this.form.id).then(res => {
                        this.form = res.data.data;
                    });
                }
                done();
            },
            searchReset() {
                this.query = {};
                this.onLoad(this.page);
            },
            searchChange(params, done) {
                this.query = params;
                this.page.currentPage = 1;
                this.onLoad(this.page, params);
                done();
            },
            selectionChange(list) {
                this.selectionList = list;
            },
            selectionClear() {
                this.selectionList = [];
                this.$refs.crud.toggleSelection();
            },
            currentChange(currentPage) {
                this.page.currentPage = currentPage;
            },
            sizeChange(pageSize) {
                this.page.pageSize = pageSize;
            },
            refreshChange() {
                this.onLoad(this.page, this.query);
            },
            onLoad(page, params = {}) {
                this.loading = true;
                getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
                    const data = res.data.data;
                    this.page.total = data.total;
                    this.data = data.records;
                    this.loading = false;
                    this.selectionClear();
                });
            }
        }
    };
</script>

<style>
</style>
