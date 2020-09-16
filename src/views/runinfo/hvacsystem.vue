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
                   v-if="permission.hvacsystem_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {getList, getDetail, add, update, remove} from "@/api/runinfo/hvacsystem";
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
            label: "室内温度",
            prop: "hsInTemp",
            rules: [{
              required: true,
              message: "请输入室内温度",
              trigger: "blur"
            }]
          },
          {
            label: "室外温度",
            prop: "hsOutTemp",
            rules: [{
              required: true,
              message: "请输入室外温度",
              trigger: "blur"
            }]
          },
          {
            label: "室内二氧化碳",
            prop: "hsInCo2",
            rules: [{
              required: true,
              message: "请输入室内二氧化碳",
              trigger: "blur"
            }]
          },
          {
            label: "送风温度",
            prop: "hsSupTemp",
            rules: [{
              required: true,
              message: "请输入送风温度",
              trigger: "blur"
            }]
          },
          {
            label: "送风速度",
            prop: "hsSupVelo",
            rules: [{
              required: true,
              message: "请输入送风速度",
              trigger: "blur"
            }]
          },
          {
            label: "回风速度",
            prop: "hsReVelo",
            rules: [{
              required: true,
              message: "请输入回风速度",
              trigger: "blur"
            }]
          },
          {
            label: "回风温度",
            prop: "hsReTemp",
            rules: [{
              required: true,
              message: "请输入回风温度",
              trigger: "blur"
            }]
          },
          {
            label: "滤网压差",
            prop: "hsFliDp",
            rules: [{
              required: true,
              message: "请输入滤网压差",
              trigger: "blur"
            }]
          },
          {
            label: "开关状态",
            prop: "hsOnSta",
            rules: [{
              required: true,
              message: "请输入开关状态",
              trigger: "blur"
            }]
          },
          {
            label: "运行状态",
            prop: "hsRunSta",
            rules: [{
              required: true,
              message: "请输入运行状态",
              trigger: "blur"
            }]
          },
          {
            label: "风机压差",
            prop: "hsFanDp",
            rules: [{
              required: true,
              message: "请输入风机压差",
              trigger: "blur"
            }]
          },
          {
            label: "手动自动调节",
            prop: "hsAmSta",
            rules: [{
              required: true,
              message: "请输入手动自动调节",
              trigger: "blur"
            }]
          },
          {
            label: "低温报警",
            prop: "hsLtAla",
            rules: [{
              required: true,
              message: "请输入低温报警",
              trigger: "blur"
            }]
          },
          {
            label: "风机频率反馈",
            prop: "hsFanFreq",
            rules: [{
              required: true,
              message: "请输入风机频率反馈",
              trigger: "blur"
            }]
          },
          {
            label: "采集时间",
            prop: "getTime",
            rules: [{
              message: "请输入采集时间",
              trigger: "blur"
            }]
          },
          {
            label: "返回接口名称",
            prop: "pushType",
            rules: [{
              message: "请输入采集时间",
              trigger: "blur"
            }]
          },
          {
            label: "返回执行状态",
            prop: "pushRes",
            rules: [{
              message: "请输入采集时间",
              trigger: "blur"
            }]
          },
          {
            label: "返回提示信息",
            prop: "pushMsg",
            rules: [{
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
        addBtn: this.vaildData(this.permission.hvacsystem_add, false),
        viewBtn: this.vaildData(this.permission.hvacsystem_view, false),
        delBtn: this.vaildData(this.permission.hvacsystem_delete, false),
        editBtn: this.vaildData(this.permission.hvacsystem_edit, false)
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
