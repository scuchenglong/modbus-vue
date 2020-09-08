<template>
    <basic-container>
        <avue-crud :option="option"
                   :table-loading="loading"
                   :data="data"
                   :page="page"
                   :permission="permissionList"
                   :before-open="beforeOpen"
                   v-model="form"
                   ref="crud"
                   @row-update="rowUpdate"
                   @row-save="rowSave"
                   @row-del="rowDel"
                   @search-change="searchChange"
                   @search-reset="searchReset"
                   @selection-change="selectionChange"
                   @current-change="currentChange"
                   @size-change="sizeChange"
                   @refresh-change="refreshChange"
                   @on-load="onLoad">
            <template slot="menuLeft">
                <el-button type="danger"
                           size="small"
                           icon="el-icon-delete"
                           plain
                           v-if="permission.feedwaterpressure_delete"
                           @click="handleDelete">删 除
                </el-button>
            </template>
        </avue-crud>
    </basic-container>
</template>

<script>
    import {getList, getDetail, add, update, remove} from "@/api/runinfo/feedwaterpressure";
    import {mapGetters} from "vuex";

    export default {
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
                                    label: "主键",
                                    prop: "id",
                                    rules: [{
                                        required: true,
                                        message: "请输入主键",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "局码",
                                    prop: "bureCode",
                                    rules: [{
                                        required: true,
                                        message: "请输入局码",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "站码",
                                    prop: "statCode",
                                    rules: [{
                                        required: true,
                                        message: "请输入站码",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "设备id",
                                    prop: "deviId",
                                    rules: [{
                                        required: true,
                                        message: "请输入设备id",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "水池液位检测",
                                    prop: "wsTl",
                                    rules: [{
                                        required: true,
                                        message: "请输入水池液位检测",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "运行状态",
                                    prop: "wsRunSta",
                                    rules: [{
                                        required: true,
                                        message: "请输入运行状态",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "给水/消防/消毒设备电压",
                                    prop: "wsVol",
                                    rules: [{
                                        required: true,
                                        message: "请输入给水/消防/消毒设备电压",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "给水/消防/消毒设备电流",
                                    prop: "wsEle",
                                    rules: [{
                                        required: true,
                                        message: "请输入给水/消防/消毒设备电流",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "给水/消防/消毒设备扬水压力",
                                    prop: "wsPumpPre",
                                    rules: [{
                                        required: true,
                                        message: "请输入给水/消防/消毒设备扬水压力",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "给水/消防/消毒设备市政供水压力",
                                    prop: "wsSupPre",
                                    rules: [{
                                        required: true,
                                        message: "请输入给水/消防/消毒设备市政供水压力",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "供水量",
                                    prop: "wsSupCount",
                                    rules: [{
                                        required: true,
                                        message: "请输入供水量",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "扬水量",
                                    prop: "wsPumpCount",
                                    rules: [{
                                        required: true,
                                        message: "请输入扬水量",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "耗电量",
                                    prop: "wsPow",
                                    rules: [{
                                        required: true,
                                        message: "请输入耗电量",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "设备工作时间",
                                    prop: "wsWTime",
                                    rules: [{
                                        required: true,
                                        message: "请输入设备工作时间",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "采集时间",
                                    prop: "getTime",
                                    rules: [{
                                        required: true,
                                        message: "请输入采集时间",
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
                    addBtn: this.vaildData(this.permission.feedwaterpressure_add, false),
                    viewBtn: this.vaildData(this.permission.feedwaterpressure_view, false),
                    delBtn: this.vaildData(this.permission.feedwaterpressure_delete, false),
                    editBtn: this.vaildData(this.permission.feedwaterpressure_edit, false)
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
