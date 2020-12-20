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
                   icon="el-icon-plus"
                   plain
                   @click="pushAll">全部推送
        </el-button>
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.equipbase_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot="category"
                slot-scope="{row}">
        <el-tag>{{ row.categoryName }}</el-tag>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="text" size="small" @click.stop="pushBase(scope.row)" icon="el-icon-share">推送</el-button>
      </template>

    </avue-crud>
  </basic-container>
</template>

<script>
import AvueUeditor from 'avue-plugin-ueditor';
import {getList, getDetail, add, update, remove, pushBase, pushAll} from "@/api/equipbase/equipbase";
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
        dialogWidth: 900,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        viewBtn: true,
        selection: true,
        excelBtn: true,
        dialogClickModal: false,
        column: [
          {
            label: "局码-P",
            prop: "bureCode",
            value: "P",
            rules: [{
              required: true,
              message: "请输入局码-P",
              trigger: "blur"
            }]
          },
          {
            label: "站码-QIP",
            prop: "statCode",
            value: "QIP",
            rules: [{
              required: true,
              message: "请输入站码-QIP",
              trigger: "blur"
            }]
          },
          {
            label: "设备id",
            prop: "deviId",
            span: 24,
            row: true,
            search: true,
            rules: [{
              required: true,
              message: "请输入设备id（能管系统提供）",
              trigger: "blur"
            }]
          },
          {
            label: "设备名称",
            prop: "dName",
            rules: [{
              required: true,
              message: "请输入设备名称",
              trigger: "blur"
            }]
          },
          // {
          //   label: "设备大类编号",
          //   prop: "dLaSortCode",
          //   rules: [{
          //     required: true,
          //     message: "请输入设备大类编号",
          //     trigger: "blur"
          //   }]
          // },
          {
            label: "设备大类",
            type: "select",
            value: "01",
            cascaderItem: ['dSmSort'],
            dicUrl: "/api/memo-system/dict-biz/dictionary?code=equip_big_type",
            dicFormatter: (res) => {
              return res.data;//返回字典的层级结构
            },
            props: {
              label: "dictValue",
              value: "dictKey"
            },
            prop: "dLaSort",
            rules: [{
              required: true,
              message: "请输入设备大类",
              trigger: "blur"
            }]
          },
          // {
          //   label: "设备小类编号",
          //   prop: "dSmSortCode",
          //   rules: [{
          //     required: true,
          //     message: "请输入设备小类编号",
          //     trigger: "blur"
          //   }]
          // },
          {
            label: "设备小类",
            type: "select",
            value: "0301",
            row: true,
            cascaderIndex: 0,
            dicUrl: "/api/memo-system/dict-biz/dictionary?code={{key}}",
            props: {
              label: "dictValue",
              value: "dictKey"
            },
            prop: "dSmSort",
            rules: [{
              required: true,
              message: "请输入设备小类",
              trigger: "blur"
            }]
          },
          {
            label: "设备型号",
            prop: "dType",
            rules: [{
              message: "请输入设备型号",
              trigger: "blur"
            }]
          },
          {
            label: "SN码",
            prop: "dSn",
            rules: [{
              message: "请输入SN码",
              trigger: "blur"
            }]
          },
          {
            label: "设备位置",
            prop: "dLoc",
            rules: [{
              required: true,
              message: "请输入设备位置",
              trigger: "blur"
            }]
          },
          {
            label: "设备详细位置",
            prop: "dDeLoc",
            rules: [{
              required: true,
              message: "请输入设备详细位置",
              trigger: "blur"
            }]
          },
          {
            label: "设备规格",
            prop: "dSpec",
            rules: [{
              message: "请输入设备规格",
              trigger: "blur"
            }]
          },
          {
            label: "设备厂商纳税人识别号",
            prop: "dMfId",
            rules: [{
              required: true,
              message: "请输入设备厂商纳税人识别号",
              trigger: "blur"
            }]
          },
          {
            label: "设备厂商全称",
            prop: "dMfName",
            rules: [{
              required: true,
              message: "请输入设备厂商全称",
              trigger: "blur"
            }]
          },
          {
            label: "厂商联系人",
            prop: "dMfLink",
            rules: [{
              message: "请输入厂商联系人",
              trigger: "blur"
            }]
          },
          {
            label: "设备描述",
            prop: "dDesc",
            rules: [{
              message: "请输入设备描述",
              trigger: "blur"
            }]
          },
          {
            label: "IP地址",
            prop: "dIp",
            rules: [{
              message: "请输入IP地址",
              trigger: "blur"
            }]
          },
          {
            label: "生产日期",
            prop: "dProDate",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            rules: [{
              message: "请输入生产日期",
              trigger: "blur"
            }]
          },
          {
            label: "采购日期",
            prop: "dBuyDate",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            rules: [{
              message: "请输入采购日期",
              trigger: "blur"
            }]
          },
          {
            label: "使用日期",
            prop: "dUseDate",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            rules: [{
              message: "请输入使用日期",
              trigger: "blur"
            }]
          },
          {
            label: "设备成本",
            prop: "dCost",
            rules: [{
              message: "请输入设备成本",
              trigger: "blur"
            }]
          },
          {
            label: "使用期限",
            prop: "dUseLim",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            rules: [{
              message: "请输入使用期限",
              trigger: "blur"
            }]
          },
          {
            label: "特殊参数",
            prop: "dSpecPara",
            rules: [{
              message: "请输入特殊参数",
              trigger: "blur"
            }]
          },
          {
            label: "额定功率",
            prop: "ratePower",
            rules: [{
              message: "额定功率",
              trigger: "blur"
            }]
          },
          {
            label: "标识",
            prop: "useState",
            rules: [{
              message: "标识:1：启用2：删除3:报废4:停用5:调拨",
              trigger: "blur"
            }]
          },
          {
            label: "上次推送时间",
            prop: "pushTime",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            rules: [{
              message: "请输入上次推送时间",
              trigger: "blur"
            }]
          },
          {
            label: "推送返回type",
            prop: "pushType",
            rules: [{
              message: "请输入推送返回值",
              trigger: "blur"
            }]
          },
          {
            label: "推送返回res",
            prop: "pushRes",
            rules: [{
              message: "请输入推送返回值",
              trigger: "blur"
            }]
          },
          {
            label: "推送返回msg",
            prop: "pushMsg",
            rules: [{
              message: "请输入推送返回值",
              trigger: "blur"
            }]
          },
          {
            label: "备注",
            prop: "remark",
            rules: [{
              message: "请输入备注",
              trigger: "blur"
            }]
          }]
      },
      data: []
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.equipbase_add, false),
        viewBtn: this.vaildData(this.permission.equipbase_view, false),
        delBtn: this.vaildData(this.permission.equipbase_delete, false),
        editBtn: this.vaildData(this.permission.equipbase_edit, false)
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
    pushAll() {
      this.$confirm("确定推送全部数据?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(() => {
            pushAll().then(() => {
              this.onLoad(this.page);
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            }, error => {
              console.log(error);
            });
          })
    },
    pushBase(row) {
      this.$confirm("确定推送本条数据?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(() => {
            pushBase(row.id).then(() => {
              this.onLoad(this.page);
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            }, error => {
              console.log(error);
            });
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
