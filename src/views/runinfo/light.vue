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
                   v-if="permission.light_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {getList, getDetail, add, update, remove} from "@/api/runinfo/light";
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
            label: "照明区域编号",
            prop: "areaId",
            rules: [{
              required: true,
              message: "请输入照明区域编号",
              trigger: "blur"
            }]
          },
          {
            label: "照明区域名称",
            prop: "areaName",
            rules: [{
              required: true,
              message: "请输入照明区域名称",
              trigger: "blur"
            }]
          },
          {
            label: "当前区域开关模式:当前区域开关模式",
            prop: "onOffState",
            rules: [{
              required: true,
              message: "请输入当前区域开关模式:当前区域开关模式",
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
            label: "运行状态,若当前照明区域所有回路都正常，则返回正常，若有回路故障/离线等，则返回异常",
            prop: "runState",
            rules: [{
              required: true,
              message: "请输入运行状态,若当前照明区域所有回路都正常，则返回正常，若有回路故障/离线等，则返回异常",
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
            label: "照明手自动状态",
            prop: "autoState",
            rules: [{
              required: true,
              message: "请输入照明手自动状态",
              trigger: "blur"
            }]
          },
          {
            label: "照明区域当前照度值：取平均值",
            prop: "illuminateValue",
            rules: [{
              required: true,
              message: "请输入照明区域当前照度值：取平均值",
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
        addBtn: this.vaildData(this.permission.light_add, false),
        viewBtn: this.vaildData(this.permission.light_view, false),
        delBtn: this.vaildData(this.permission.light_delete, false),
        editBtn: this.vaildData(this.permission.light_edit, false)
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
