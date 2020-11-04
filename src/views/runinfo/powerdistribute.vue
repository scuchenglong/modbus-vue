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
                   v-if="permission.powerdistribute_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {getList, getDetail, add, update, remove} from "@/api/runinfo/powerdistribute";
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
          // {
          //   label: "三相电压",
          //   prop: "pdTpVol",
          //   rules: [{
          //     required: true,
          //     message: "请输入三相电压",
          //     trigger: "blur"
          //   }]
          // },
          {
            label: "A相电压",
            prop: "aVoltageValue",
            rules: [{
              required: true,
              message: "请输入A相电压",
              trigger: "blur"
            }]
          },
          {
            label: "B相电压",
            prop: "bVoltageValue",
            rules: [{
              required: true,
              message: "请输入B相电压",
              trigger: "blur"
            }]
          },
          {
            label: "C相电压",
            prop: "cVoltageValue",
            rules: [{
              required: true,
              message: "请输入C相电压",
              trigger: "blur"
            }]
          },
          // {
          //   label: "三相电流",
          //   prop: "pdTpCur",
          //   rules: [{
          //     required: true,
          //     message: "请输入三相电流",
          //     trigger: "blur"
          //   }]
          // },
          {
            label: "A相电流",
            prop: "aElectricityValue",
            rules: [{
              required: true,
              message: "请输入A相电流",
              trigger: "blur"
            }]
          },
          {
            label: "B相电流",
            prop: "bElectricityValue",
            rules: [{
              required: true,
              message: "请输入B相电流",
              trigger: "blur"
            }]
          },
          {
            label: "C相电流",
            prop: "cElectricityValue",
            rules: [{
              required: true,
              message: "请输入C相电流",
              trigger: "blur"
            }]
          },
          {
            label: "无功功率",
            prop: "reaPow",
            rules: [{
              required: true,
              message: "请输入无功功率",
              trigger: "blur"
            }]
          },
          {
            label: "有功功率",
            prop: "actPow",
            rules: [{
              required: true,
              message: "请输入有功功率",
              trigger: "blur"
            }]
          },
          {
            label: "无功电度",
            prop: "reaEne",
            rules: [{
              required: true,
              message: "请输入无功电度",
              trigger: "blur"
            }]
          },
          {
            label: "有功电度",
            prop: "actEne",
            rules: [{
              required: true,
              message: "请输入有功电度",
              trigger: "blur"
            }]
          },
          {
            label: "功率因数",
            prop: "powFac",
            rules: [{
              required: true,
              message: "请输入功率因数",
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
        addBtn: this.vaildData(this.permission.powerdistribute_add, false),
        viewBtn: this.vaildData(this.permission.powerdistribute_view, false),
        delBtn: this.vaildData(this.permission.powerdistribute_delete, false),
        editBtn: this.vaildData(this.permission.powerdistribute_edit, false)
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
