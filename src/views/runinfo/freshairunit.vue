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
                   v-if="permission.freshairunit_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {getList, getDetail, add, update, remove} from "@/api/runinfo/freshairunit";
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
            label: "采集时间",
            prop: "getTime",
            rules: [{
              required: true,
              message: "请输入采集时间",
              trigger: "blur"
            }]
          },
          {
            label: "推送返回值",
            prop: "pushType",
            rules: [{
              required: true,
              message: "请输入推送返回值",
              trigger: "blur"
            }]
          },
          {
            label: "推送返回值",
            prop: "pushRes",
            rules: [{
              required: true,
              message: "请输入推送返回值",
              trigger: "blur"
            }]
          },
          {
            label: "推送返回值",
            prop: "pushMsg",
            rules: [{
              required: true,
              message: "请输入推送返回值",
              trigger: "blur"
            }]
          },
          {
            label: "启动状态（默认高速）",
            prop: "onSta",
            rules: [{
              required: true,
              message: "请输入启动状态（默认高速）",
              trigger: "blur"
            }]
          },
          {
            label: "低速启动状态",
            prop: "lOnSta",
            rules: [{
              required: true,
              message: "请输入低速启动状态",
              trigger: "blur"
            }]
          },
          {
            label: "停止状态（默认高速）",
            prop: "stopSta",
            rules: [{
              required: true,
              message: "请输入停止状态（默认高速）",
              trigger: "blur"
            }]
          },
          {
            label: "低速停止状态",
            prop: "lStopSta",
            rules: [{
              required: true,
              message: "请输入低速停止状态",
              trigger: "blur"
            }]
          },
          {
            label: "运行状态",
            prop: "runSta",
            rules: [{
              required: true,
              message: "请输入运行状态",
              trigger: "blur"
            }]
          },
          {
            label: "故障状态",
            prop: "fauSta",
            rules: [{
              required: true,
              message: "请输入故障状态",
              trigger: "blur"
            }]
          },
          {
            label: "启动控制（默认高速）",
            prop: "onCtr",
            rules: [{
              required: true,
              message: "请输入启动控制（默认高速）",
              trigger: "blur"
            }]
          },
          {
            label: "低速启动控制",
            prop: "lOnCtr",
            rules: [{
              required: true,
              message: "请输入低速启动控制",
              trigger: "blur"
            }]
          },
          {
            label: "停止控制（默认高速）",
            prop: "stopCtr",
            rules: [{
              required: true,
              message: "请输入停止控制（默认高速）",
              trigger: "blur"
            }]
          },
          {
            label: "低速停止控制",
            prop: "lStopCtr",
            rules: [{
              required: true,
              message: "请输入低速停止控制",
              trigger: "blur"
            }]
          },
          {
            label: "连锁控制",
            prop: "lockCtr",
            rules: [{
              required: true,
              message: "请输入连锁控制",
              trigger: "blur"
            }]
          },
          {
            label: "手动/自动控制",
            prop: "amCtr",
            rules: [{
              required: true,
              message: "请输入手动/自动控制",
              trigger: "blur"
            }]
          },
          {
            label: "远程/就地状态",
            prop: "remLocSta",
            rules: [{
              required: true,
              message: "请输入远程/就地状态",
              trigger: "blur"
            }]
          },
          {
            label: "累计运行时长",
            prop: "runTime",
            rules: [{
              required: true,
              message: "请输入累计运行时长",
              trigger: "blur"
            }]
          },
          {
            label: "能耗总量",
            prop: "eneCon",
            rules: [{
              required: true,
              message: "请输入能耗总量",
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
        addBtn: this.vaildData(this.permission.freshairunit_add, false),
        viewBtn: this.vaildData(this.permission.freshairunit_view, false),
        delBtn: this.vaildData(this.permission.freshairunit_delete, false),
        editBtn: this.vaildData(this.permission.freshairunit_edit, false)
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
