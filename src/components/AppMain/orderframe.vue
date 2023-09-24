<template>
  <div class="mulitotal">
    <div class="multisearch" style="display: flex; width: 100%">
      <el-row style="display: flex; width: 90%">
        <div class="intents" style="display: flex">
          <el-input
            style="width: 500px"
            placeholder="填入需要查询内容"
            v-model="input"
            clearable
          >
          </el-input>
          <el-button
            type="primary"
            style="margin-left: 10px; width: 1 00px"
            @click="intent_search()"
            >提交查询</el-button
          >
        </div>
        <div class="save" style="float: right; width: 90%">
          <el-button
            type="primary"
            style="margin-left: 50px; width: 100px; float: right"
            @click="saveTable()"
            >保存</el-button
          >
        </div>
      </el-row>
    </div>
    <div class="table_action">
      <el-row class="arow" style="display: flex; margin-top: 10px">
        <el-button type="primary" style="width: 90px" @click="addNewRow"
          >新增</el-button
        >
        <template>
          <div>
            <el-button
              type="primary"
              @click="dialogVisible = true"
              style="margin-left: 30px; font-size: 15px"
              >批量添加</el-button
            >
            <el-dialog
              :visible.sync="dialogVisible"
              title="批量添加"
              width="40%"
              min-height=""
              model="dialogVisible"
            >
              <el-form ref="form" :model="form" label-width="100px">
                <div>
                  <el-input
                    style="float: center"
                    type="textarea"
                    :rows="5"
                    v-model="form.data"
                    placeholder="请输入此条，每行一个词条，同义词用','分开，回车换行。"
                  ></el-input>
                </div>
                <div
                  style="margin-top: 10px; display: flex; float: left; left: 0"
                >
                  <el-upload
                    ref="upload"
                    :auto-upload="false"
                    :file-list="fileList"
                    :on-change="handleFileChange"
                    :before-upload="beforeUpload"
                    :on-exceed="handleExceed"
                    :limit="1"
                    accept=".csv"
                  >
                    <div>
                      <el-button
                        slot="trigger"
                        size="small"
                        type="primary"
                        style="float: left"
                        >选择文件</el-button
                      >
                      <div
                        slot="tip"
                        class="el-upload__tip"
                        style="
                          position: relative;
                          top: 10px;
                          left: 10px;
                          display: flex;
                          align-items: center;
                        "
                      >
                        只能上传csv文件,且不超过10MB
                      </div>
                      <div></div>
                    </div>
                  </el-upload>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button
                  type="primary"
                  @click="handleSubmit"
                  style="float: right"
                  >确定</el-button
                >
                <el-button
                  @click="dialogVisible = false"
                  style="margin-right: 10px"
                  >取消</el-button
                >
              </div>
            </el-dialog>
          </div>
        </template>
      </el-row>
    </div>
    <div class="dframe" style="position: relative; width: 90%">
      <el-table
        :data="
          tableData
            .filter(
              (data) =>
                !search ||
                data.Syns.toLowerCase().includes(search.toLowerCase()) ||
                data.Intents.toLowerCase().includes(search.toLowerCase()) ||
                data.Slots.toLowerCase().includes(search.toLowerCase())
            )
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        :border="true"
        style="margin-top: 10px; margin-right: 10px"
        @cell-mouse-leave="MouseOut"
        @cell-mouse-enter="MouseIn"
        @focus="lockrow"
        @blur="unlock"
        :span-method="objectSpanMethod"
        sortable
      >
        <!--把prop换成和接口一致的东西就行了-->
        <el-table-column
          label="意图"
          prop="Intents"
          align="center"
          sortable
          :resizable="false"
        >
          <template slot-scope="scope">
            <el-select
              v-if="scope.row.tEdit"
              v-model="scope.row.Intents"
              slot="prepend"
              placeholder=""
              style="width: 50%"
              @focus="lockrow(scope.row)"
              @change="optionSelect(scope.row)"
              filterable
              allow-create
              align="left"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button
              v-if="scope.row.tEdit"
              size="mini"
              icon="el-icon-plus"
              style="margin-left: 5px"
              @click="addFirRow(scope.$index, scope.row)"
            ></el-button>
            <el-button
              v-if="scope.row.tEdit"
              size="mini"
              icon="el-icon-delete"
              style="margin-left: 5px"
              @click="DeleteFirRow(scope.$index, scope.row)"
            ></el-button>
            <p slot-scope="scope" align="center" v-else>
              {{ scope.row.Intents }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="槽位"
          prop=""
          align="center"
          sortable
          @cell-mouse-enter="MouseIn(scope.row, scope.column)"
        >
          <template slot-scope="scope">
            <div class="form-align">
              <el-form ref="form" :model="form" v-if="scope.row.tEdit">
                <el-form-item
                  v-if="scope.row.tEdit"
                  prop="slotForm"
                  :rules="[{ pattern: /^[^0-9!]*$/, trigger: 'change' }]"
                >
                  <el-input
                    v-model="scope.row.Slots"
                    placeholder="请输入"
                    clearable
                    class="input-align"
                    @focus="lockrow(scope.row)"
                    @blur="unlock(scope.row, scope.$index, scope.column)"
                    @input="inputcheck(scope.row.Slots)"
                    @cell-mouse-leave="
                      MouseOut(scope.row, scope.$index, scope.column)
                    "
                    :class="{ 'input-error': 'Ierror' }"
                  ></el-input>
                </el-form-item>
              </el-form>
              <p v-else>{{ scope.row.Slots }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="命令词"
          prop="Syns"
          align="center"
          sortable
          max-height="100px"
          @cell-mouse-enter="MouseIn(scope.row, scope.column)"
        >
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.tEdit"
              v-model="scope.row.Syns"
              placeholder="请输入"
              :class="{ errorBorder: Iserror }"
              clearable
              @focus="lockrow(scope.row)"
              @blur="unlock(scope.row, scope.$index, scope.column)"
              @input="inputcheck(scope.row.Syns)"
              @cell-mouse-leave="
                MouseOut(scope.row, scope.$index, scope.column)
              "
            ></el-input>
            <p v-else>{{ scope.row.Syns }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header">
            <p>操作</p>
          </template>
          <template slot-scope="scope">
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
            <el-dialog
              :visible.sync="scope.row.deleteDialog"
              width="30%"
              center
            >
              <span>该词条被意图引用, 不可直接删除, 如要删除, 请取消关联</span>
              <span slot="footer" class="dialog-footer">
                <el-button
                  type="primary"
                  @click="scope.row.deleteDialog = false"
                  >确定</el-button
                >
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="float: right; position: relative">
        <el-pagination
          @size-change="handleSizeChange"
          @page-size="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import pubsub from "pubsub-js";
let upload_url =
  "https://app-home-test.viomi.com.cn/ai/speechandlanguage/viominlu/upload_command_words_file";
const total_url =
  "https://app-home-test.viomi.com.cn/ai/speechandlanguage/viominlu/download_command_words_file";
const refresh_url =
  "https://app-home-test.viomi.com.cn/ai/speechandlanguage/viominlu/reinitialization";

export default {
  data() {
    return {
      input: "",
      search: "",
      currentPage: 1,
      pageSize: 10,
      options: [{}],
      dialogVisible: false,
      Iserror: false,
      form: { data: "" },
      fileList: [],
      tableData: [],
      initData: [],
      rowId: 0,
      position: 0,
      emitsave: 0,
      newCategoryTableData: [],
      status: 0,

      link: "",
      exampleCsv: [
        {
          word: "云米冰箱两侧温度高",
          intent: "faq",
          slot: "冰箱",
        },
        {
          word: "云米冰箱两侧温度高",
          intent: "faq",
          slot: "冰箱",
        },
      ],
    };
  },

  created() {
    this.FetchTotal();
    this.getSpanArr(this.tableData);
    console.log(this.rowspanArr);
  },

  methods: {
    FetchTotal() {
      let option = [];
      axios.post(refresh_url);
      axios.post(total_url).then((response) => {
        this.status = response.status;
        let data = response.data;
        console.log(data);
        let Sindex = 4;
        let lstof_row = [];
        let lstof_word = data.split(",");
        for (let index = Sindex; index <= lstof_word.length; index++) {
          this.rowId = index;
          if ((index - Sindex) % 3 == 0 && index !== 4) {
            let slot = lstof_row[2];
            this.tableData.push({
              Intents: lstof_row[1],
              Slots: slot.slice(0, slot.indexOf("/") - 1),
              Syns: lstof_row[0],
              tEdit: false,
              lockrow: false,
              id: index,
              deleteDialog: false,
              groupNumber: 1,
            });
            option.push(lstof_row[1]);
            lstof_row = [];
            lstof_row.push(lstof_word[index]);
          } else {
            lstof_row.push(lstof_word[index]);
          }
        }
        this.initData = this.tableData;
        const optionSet = new Set(option);
        const selector = optionSet.keys();
        let optionSlim = new Set();
        for (let i = 0; i < optionSet.size; i++) {
          optionSlim.add({
            value: selector.next().value,
            label: i,
          });
        }
        this.options = Array.from(optionSlim);
        this.publish();
      });
    },

    getSpanArr(data) {
      // merging identical rows
      if (data.length > 1) {
        for (var index = 0; index < data.length; index++) {
          var j = index + 1;
          var count = 1;
          if (data[index].Slots !== "" && data[index].Syns !== "") {
            while (
              j < data.length &&
              data[index].Slots == data[j].Slots &&
              data[index].Syns == data[j].Syns &&
              data[j].groupNumber != -1
            ) {
              data[j].groupNumber = -1;
              count += 1;
              j++;
            }
            data[index].groupNumber = count;
          }
        }
        this.tableData = data;
      } else {
        data[0].groupNumber = 1;
      }
      console.log(data);
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex !== 0) {
        if (row.groupNumber && row.groupNumber > 0) {
          return {
            rowspan: row.groupNumber,
            colspan: 1,
          };
        } else {
          if (row.groupNumber && row.groupNumber == -1) {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        }
      }
    },

    publish() {
      pubsub.publish("save", this.emitsave);
    },

    intent_search() {
      this.search = this.input;
    },

    // for table element altering
    addNewRow() {
      this.tableData.unshift({
        Syns: "",
        Intents: "",
        Slots: "",
        tEdit: true,
        lockrow: false,
        id: this.rowId + 1,
        groupNumber: 1,
        deleteDialog: false,
      });
      this.getSpanArr(this.tableData);
    },

    addFirRow(index) {
      let data_tail = this.tableData.slice(index + 1);
      let data_head = this.tableData.slice(0, index + 1);
      data_head.push({
        Syns: this.tableData[index]["Syns"],
        Intents: "",
        Slots: this.tableData[index]["Slots"],
        tEdit: true,
        lockrow: true,
        id: this.rowId + 1,
        groupNumber: 1,
        deleteDialog: false,
      });
      let new_data = data_head.concat(data_tail);
      this.getSpanArr(new_data);
    },

    handleDelete(index, row) {
      console.log(index, row);
      if (row.groupNumber !== 1) {
        row.deleteDialog = true;
      } else {
        this.$confirm("确定要删除吗?", "删除提示", {
          iconClass: "el-icon-question",
          cancelButtonText: "",
          type: "warning",
        }).then((res) => {
          this.emitsave = 1;
          this.publish();
          this.tableData.splice(index, 1);
          this.getSpanArr(this.tableData);
          this.$message({
            message: "删除成功, 保存以生效",
            type: "success",
            duration: 1000,
          });
        });
      }
    },

    DeleteFirRow(index) {
      this.$confirm("确定要删除吗?", "删除提示", {
        iconClass: "el-icon-question",
        cancelButtonText: "",
        type: "warning",
      }).then((res) => {
        this.emitsave = 1;
        this.publish();
        this.tableData.splice(index, 1);
        this.getSpanArr(this.tableData);
        this.$message({
          message: "删除成功, 保存以生效",
          type: "success",
          duration: 1000,
        });
      });
    },

    optionSelect(row) {
      this.emitsave = 1;
      this.publish();
      console.log(this.options);
      let new_label = this.options.length;
      let exist = 0;
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].value === row.Intents) {
          exist = 1;
          break;
        }
      }
      if (exist === 0) {
        this.options.push({
          value: row.Intents,
          label: new_label,
        });
        new_label += 1;
      }
      this.$message({
        message: "修改成功, 保存以生效",
        type: "success",
        duration: 1000,
      });
    },

    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },

    saveTable() {
      let eddited = this.tableData;
      const headers = ["Syns", "Intents", "Slots"];
      const csvRows = [headers.join(",")];
      for (let i = 0; i < eddited.length; i++) {
        const values = headers.map((header) => {
          const cellValue =
            eddited[i][header] === null || eddited[i][header] === undefined
              ? ""
              : eddited[i][header];
          return `${cellValue}`.replace(/"/g, '""');
        });
        csvRows.push(values.join(",").replace("\n", ""));
      }
      csvRows[0] = ["word", "intent", "slot"];
      let csvFilecon = csvRows.join("\n") + "\n";
      const formData = new FormData();
      const csvFile = new Blob([csvFilecon], {
        type: "text/csv; charset=utf-8",
      });
      formData.append("file", csvFile, "File.csv");

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(csvFile);
      downloadLink.download = "File.csv";
      // downloadLink.click();

      axios
        .post(upload_url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert("全量更新成功");
        })
        .catch((error) => {
          alert("上传失败");
          console.error("Error uploading file:", error);
        });
      /*
            // id 部分想一想
            let added = eddited.filter(x => !oringin.find(y => y.id === x.id));
            let deleted = oringin.filter(x => !eddited.find(y => y.id === x.id));
            let modifiy = eddited.filter(x => {
                let edditObject = origin.find(y => y.id === x.id);
                return edditObject && JSON.stringify(edditObject) != JSON.stringify(x)
            });
            // lacking deleted and modifiy
            let addCsvData = Papa.unparse(added);
            axios.post(
                upload_url,
                {
                    body: { "file": addCsvData },
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            ).then((response) => {
                if (response.statusText == "OK") {
                    alert("保存成功");
                } else {
                    alert("response_error");
                }
            });*/
    },

    handleFileChange(file, fileList) {
      this.fileList = fileList.slice(-1);
      const reader = new FileReader();
      reader.onload = () => {
        this.form.data = reader.result;
      };
      reader.readAsText(file.raw);
    },

    beforeUpload(file) {
      const isCSV = file.type === "text/csv";
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isCSV) {
        this.$message.error("只能上传csv文件");
      }
      if (!isLt10M) {
        this.$message.error("文件大小不能超过10MB");
      }
      return isCSV && isLt10M;
    },

    handleExceed(files, fileList) {
      this.$message.warning(`只能上传一个csv文件`);
    },

    handleSubmit() {
      const csvData = this.form.data;
      console.log(csvData);
      let Sindex = 4;
      let lstof_row = [];
      let lstof_word = csvData.split(",");
      for (let index = Sindex; index < lstof_word.length; index++) {
        if ((index - Sindex) % 3 == 0 && index !== 4) {
          this.rowId++;
          let slot = lstof_row[2];
          this.tableData.push({
            Intents: lstof_row[1],
            Slots: slot.slice(0, slot.indexOf("/") - 1),
            Syns: lstof_row[0],
            tEdit: false,
            lockrow: false,
            id: this.rowId,
            deleteDialog: false,
          });
          lstof_row = [];
          lstof_row.push(lstof_word[index]);
        } else {
          lstof_row.push(lstof_word[index]);
        }
      }
      console.log(lstof_word);
      console.log(this.tableData);
      this.dialogVisible = false;
    },

    /*
    downloadExample() {
      let eddited = this.tableData;
      const headers = ["word", "intent", "slot"];
      const csvRows = [headers.join(",")];
      for (const row of eddited) {
        const values = headers.map((header) => {
          const cellValue =
            row[header] === null || row[header] === undefined
              ? ""
              : row[header];
          return `${cellValue}`.replace(/"/g, '""');
        });
        csvRows.push(values.join(",").replace("\n", ""));
      }
      let csvFilecon = csvRows.join("\n") + "\n";
      const formData = new FormData();
      const csvFile = new Blob(["\uFEFF${csvFilecon}"], {
        encoding: "UTF-8",
        type: "text/csv; charset=utf-8",
      });
      this.link = URL.createObjectURL(blob);
    }, */

    lockrow(row) {
      row.lockrow = true;
      row.oldIntent = row.Intents;
      row.oldsyn = row.Syns;
      row.oldSlots = row.Slots;
    },

    unlock(row, curIndex, column) {
      row.lockrow = false;
      row.tEdit = false;
      let reg = /^[^0-9!@#$%^&*(),.?":{}|<>_+=\-\[\]\\';\/`~]*$/;
      let invaild = 0;
      for (let i = 0; i < row.Syns.length; i++) {
        if (!reg.test(row.Syns[i])) {
          invaild = 1;
          console.log(row.Syns[i]);
          break;
        }
      }

      for (let i = 0; i < row.Slots.length; i++) {
        if (!reg.test(row.Slots[i])) {
          invaild = 1;
          console.log(row.Slots[i]);
          break;
        }
      }

      if (invaild === 1) {
        this.Iserror = true;
        this.$message({
          message: "不支持输入数字，特殊符号",
          type: "error",
          duration: 1000,
        });
      } else {
        this.getSpanArr(this.tableData);
        this.Iserror = false;
        if (column.label == "槽位") {
          this.emitsave = 1;
          this.publish();
          if (row.oldSlots !== row.Slots) {
            this.$message({
              message: "修改成功, 保存以生效",
              type: "success",
              duration: 1000,
            });
          }
        } else {
          if (row.Syns !== row.oldsyn) {
            this.emitsave = 1;
            this.publish();
            this.$message({
              message: "修改成功,保存以生效",
              type: "success",
              duration: 1000,
            });
          }
        }
      }
    },

    inputcheck(word) {
      let reg = /^[^0-9!@#$%^&*(),.?":{}|<>_+=\-\[\]\\';\/`~]*$/;
      let invaild = 0;
      for (let i = 0; i < word.length; i++) {
        if (!reg.test(word[i])) {
          invaild = 1;
          break;
        }
      }
      if (invaild === 1) {
        this.Iserror = true;
        this.$message({
          message: "不支持输入数字，特殊符号",
          type: "error",
          duration: 1000,
        });
      }
    },

    MouseIn(row, column) {
      row.tEdit = true;
      row.oldIntent = row.Intents;
      row.oldsyn = row.Syns;
      row.oldSlots = row.Slots;
    },

    MouseOut(row, curIndex, column) {
      if (row.lockrow === false) {
        if (column.label == "意图") {
          row.tEdit = !row.tEdit;
          if (row.Intents !== row.oldIntent) {
            this.emitsave = 1;
            this.publish();
            this.$message({
              message: "修改成功, 保存以生效",
              type: "success",
              duration: 1000,
            });
          }
        } else {
          row.tEdit = !row.tEdit;
          if (row.Syns !== row.oldsyn) {
            this.emitsave = 1;
            this.publish();
            this.$message({
              message: "修改成功,保存以生效",
              type: "success",
              duration: 1000,
            });
          }
        }
      }
    },
  },
};
</script>

<style>
.errorBorder {
  border-color: red;
}

.input-align {
  top: 10px;
}

.vxe-button.type--button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
