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
                           v-if="permission.elevator_delete"
                           @click="handleDelete">删 除
                </el-button>
            </template>
        </avue-crud>
    </basic-container>
</template>

<script>
    import {getList, getDetail, add, update, remove} from "@/api//elevator";
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
                                    label: "电梯故障代码",
                                    prop: "eleAlaCode",
                                    rules: [{
                                        required: true,
                                        message: "请输入电梯故障代码",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "电梯运行状态",
                                    prop: "eleRunSta",
                                    rules: [{
                                        required: true,
                                        message: "请输入电梯运行状态",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "电梯急停状态",
                                    prop: "eleStopStat",
                                    rules: [{
                                        required: true,
                                        message: "请输入电梯急停状态",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "电梯检修状态",
                                    prop: "eleRepSta",
                                    rules: [{
                                        required: true,
                                        message: "请输入电梯检修状态",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "电梯上行状态",
                                    prop: "eleUpSta",
                                    rules: [{
                                        required: true,
                                        message: "请输入电梯上行状态",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "电梯下行状态",
                                    prop: "eleDownSta",
                                    rules: [{
                                        required: true,
                                        message: "请输入电梯下行状态",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "电梯开关状态",
                                    prop: "eleOnSta",
                                    rules: [{
                                        required: true,
                                        message: "请输入电梯开关状态",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "扶梯盖板防盗",
                                    prop: "eleAtp",
                                    rules: [{
                                        required: true,
                                        message: "请输入扶梯盖板防盗",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "扶梯紧急故障",
                                    prop: "eleEmerAla",
                                    rules: [{
                                        required: true,
                                        message: "请输入扶梯紧急故障",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "扶梯防火卷帘门",
                                    prop: "eleFrd",
                                    rules: [{
                                        required: true,
                                        message: "请输入扶梯防火卷帘门",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "扶梯消防信号反馈",
                                    prop: "eleFsb",
                                    rules: [{
                                        required: true,
                                        message: "请输入扶梯消防信号反馈",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "扶梯火警停止",
                                    prop: "eleFas",
                                    rules: [{
                                        required: true,
                                        message: "请输入扶梯火警停止",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "扶梯左扶手带速度报警",
                                    prop: "eleLpAla",
                                    rules: [{
                                        required: true,
                                        message: "请输入扶梯左扶手带速度报警",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "扶梯右扶手带速度报警",
                                    prop: "eleRpAla",
                                    rules: [{
                                        required: true,
                                        message: "请输入扶梯右扶手带速度报警",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "扶梯水位监测",
                                    prop: "eleWl",
                                    rules: [{
                                        required: true,
                                        message: "请输入扶梯水位监测",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "扶梯报警故障",
                                    prop: "eleAlaFau",
                                    rules: [{
                                        required: true,
                                        message: "请输入扶梯报警故障",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "扶梯故障停止",
                                    prop: "eleFauStop",
                                    rules: [{
                                        required: true,
                                        message: "请输入扶梯故障停止",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "扶梯运行停止",
                                    prop: "eleRunStop",
                                    rules: [{
                                        required: true,
                                        message: "请输入扶梯运行停止",
                                        trigger: "blur"
                                    }]
                                },
                                {
                                    label: "扶梯上电",
                                    prop: "elePowOn",
                                    rules: [{
                                        required: true,
                                        message: "请输入扶梯上电",
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
                    addBtn: this.vaildData(this.permission.elevator_add, false),
                    viewBtn: this.vaildData(this.permission.elevator_view, false),
                    delBtn: this.vaildData(this.permission.elevator_delete, false),
                    editBtn: this.vaildData(this.permission.elevator_edit, false)
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
