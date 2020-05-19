<template>
    <div class="user-list-container">
      <el-row :gutter="24">
        <el-col :span="6" >
          <el-row :gutter="24">
            <el-col :span="16" >
              <el-input
                placeholder="输入关键字过滤"
                v-model="filterText">
              </el-input>
            </el-col>
            <el-col :span="8" >
              <el-button @click="addClick">添加</el-button>
            </el-col>
          </el-row>
          <div class="filter-tree">
            <el-tree
              :data="productTreeList"
              :props="defaultProps"
              :default-expand-all="expandAll"
              :highlight-current="true"
              :filter-node-method="filterNode"
              ref="tree"
              @node-click="treeNodeClick">
            </el-tree>
          </div>
        </el-col>
        <el-col :span="18">
          <el-form ref="productForm" size="mini" :model="productForm" label-width="100px" v-show="showForm" :rules="productRules">
            <el-form-item label="服务名称" prop="service_name">
                  <el-input v-model="productForm.service_name"  :disabled="disabled" placeholder="请输入业务线名称"></el-input>
              </el-form-item>
              <el-form-item label="字母简称" prop="module_letter">
                  <el-input v-model="productForm.module_letter"  :disabled="disabled" placeholder="请输入字母简称"></el-input>
              </el-form-item>
              <el-form-item label="所属业务线" prop="pid">
                  <el-select class="select" v-model="productForm.pid" filterable :disabled="disabled" placeholder="上级业务线">
                    <el-option
                      v-for="(item, index) in productLevel"
                      :key="index"
                      :label="item.service_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="运维接口人" prop="op_interface">
                  <el-select multiple class="select" v-model="productForm.op_interface"  :disabled="disabled" filterable placeholder="请选择">
                    <el-option
                      v-for="(item, index) in userList"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                        <span style="float: left">{{ item.name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.email }}</span>
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="业务接口人" prop="dev_interface">
                  <el-select multiple class="select" v-model="productForm.dev_interface" size="mini" :disabled="disabled" filterable placeholder="请选择">
                    <el-option
                      v-for="(item, index) in userList"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                      size="mini">
                        <span style="float: left">{{ item.name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.email }}</span>
                    </el-option>
                  </el-select>
              </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitClick" :disabled="disabled">提交</el-button>
              <el-button type="primary" @click="editClick" :disabled="buttonDisabled">修改</el-button>
              <el-button type="primary" @click="deleteClick" :disabled="buttonDisabled">删除</el-button>
              <el-button type="primary" @click="addkClick" :disabled="buttonDisabled">扩容</el-button>
            </el-form-item>
          </el-form>
          <el-dialog title="扩容机器" :visible.sync="isFormVisible">
                <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addRule">
                  <el-form-item label="付费方式" prop="ChargeType">
                    <el-select v-model="addForm.ChargeType" @change="changechargetype">
                      <el-option
                        v-for="(item, index) in ChargeTypeList"
                        :key="index"
                        :label="item"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item v-show="ShowPeriodUnit" label="购买单位" prop="PeriodUnit">
                    <el-select v-model="addForm.PeriodUnit">
                      <el-option
                        v-for="(item, index) in PeriodUnitList"
                        :key="index"
                        :label="item"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="实例名称" prop="InstanceName">
                    <el-input v-model="addForm.InstanceName" maxlength=50 placeholder="请输入实例名称"></el-input>
                  </el-form-item>
                  <el-form-item label="备注" prop="remark">
                    <el-input v-model="addForm.remark" maxlength=50 placeholder="请输入备注"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="isFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="KuorongForm">确 定</el-button>
                </div>
              </el-dialog>
          <el-table
              class="table"
              v-loading="serverListloading"
              element-loading-text="拼命加载中"
              :data="serverList"
              border
              v-show="showServerListTable">
            <el-table-column
                    prop="idc.name"
                    label="机房"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="hostname"
                    label="主机名"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="ip"
                    label="IP地址"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="env"
                    label="环境"
                    align="center">
            </el-table-column>
             <el-table-column
                    prop="updated_time"
                    label="更新时间"
                    align="center">
            </el-table-column>
            <el-table-column
              prop=""
              label="操作"
              width="100"
              align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="editClicks(scope.row)">修改资产</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="text-center" v-show="serverListTotalNum>=10">
            <el-pagination
                    background
                    @current-change="paginationChange"
                    layout="total, prev, pager, next, jumper"
                    :current-page.sync="serverListPage"
                    :total="serverListTotalNum">
            </el-pagination>
          </div>
          <el-dialog title="修改资产状态与环境" :visible.sync="changeServerVisible">
            <el-form ref="changeServerForm" :model="changeServerForm" label-width="70px" :rules="changeServerFormRules">
              <el-form-item label="主机名称" prop="hostname">
                <el-input v-model="changeServerForm.hostname" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="IP地址" prop="ip">
                <el-input v-model="changeServerForm.ip" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="环境" prop="status">
                <el-select v-model="changeServerForm.env">
                  <el-option
                    v-for="(item, index) in envList"
                    :key="index"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="changeServerVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitchangeServerClick">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { getUserList, getGroupsList, UserInfo } from '@/api/users'
import { getProductTree, getGroupNodeList,
  getProductLevel2, getProductLevelInfo,
  kuorongServer,
  addProduct, updateProduct, deleteProductLevelInfo,
  getServerList, updateServer } from '@/api/resource'
export default {
  data() {
    return {
      productFlag: '',
      showForm: false,
      disabled: false,
      buttonDisabled: false,
      name: '',
      isFormVisible: false,
      ShowPeriodUnit: false,
      changeServerVisible: false,
      addServerVisible: false,
      envList: ['Product', 'Pre', 'Test', 'Dev'],
      showServerListTable: false,
      server_purpose: 0,
      serverList: [],
      serverListTotalNum: 0,
      serverListPage: 1,
      serverListloading: false,
      expandAll: false,
      addForm: {
        idc: '',
        cabinet: '',
        service: '',
        server_purpose: '',
        env: '',
        ChargeType: '',
        PeriodUnit: '',
        InstanceName: '',
        remark: '',
        created_user: '',
        updated_user: '',
        ImageId: '',
        InstanceType: '',
        SecurityGroupIds: [],
        VSwitchId: ''
      },
      ChargeTypeList: ['按量付费', '包年包月'],
      PeriodUnitList: ['Week', 'Month'],
      searchForm: {
        hostname: '',
        idc: '',
        cabinet: '',
        service: '',
        server_purpose: '',
        'page': 1
      },
      productForm: {
        service_name: '',
        module_letter: '',
        dev_interface: [],
        op_interface: [],
        pid: ''
      },
      changeServerForm: {
        id: '',
        hostname: '',
        ip: '',
        status: '',
        env: ''
      },
      changeServerFormRules: {
        status: [
          { required: true, trigger: 'blur', message: '请选择状态' }
        ],
        env: [
          { required: true, trigger: 'blur', message: '请选择环境' }
        ]
      },
      addRule: {
        ChargeType: [
          { required: true, trigger: 'blur', message: '请选择付费方式' }
        ],
        PeriodUnit: [
          { required: true, trigger: 'blur', message: '请选择购买单位' }
        ],
        InstanceName: [
          { required: true, message: '必须输入实例名称', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '具有唯一标识的备注', trigger: 'blur' }
        ]
      },
      productRules: {
        service_name: [
          { required: true, trigger: 'blur', message: '请输入业务线名称' }
        ],
        pid: [
          { required: true, trigger: 'blur', message: '请选择上级业务线' }
        ],
        module_letter: [
          { required: true, trigger: 'change', message: '请输入字母简称' }
        ]
      },
      userinfo: '',
      gid: 1,
      gidList: [],
      userList: [],
      groupList: [],
      filterText: '',
      productTreeList: [],
      productLevel: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      state: 0
    }
  },
  created() {
    this.state = 1
  },
  watch: {
    state() {
      UserInfo().then(res => {
        this.addForm.created_user = res.username
        this.addForm.updated_user = res.username
        // 区分普通用户和超级用户的权限
        if (res.is_superuser) {
          getProductTree().then(res => {
            this.productTreeList = res
            console.log(res)
          })
        } else {
          this.userinfo = res
          const g_id = res.groupsinfo.forEach((item, index) => {
            this.gidList.push(g_id)
          })
          this.gid = res.groupsinfo[0].gid
          getGroupNodeList(this.gid).then(res => {
            this.productTreeList = res
          })
        }
        // this.userinfo = res
        // const gid = res.groupsinfo.forEach((item, index) => {
        //   this.gidList.push(gid)
        // })
        // this.gid = res.groupsinfo[0].gid
        // getGroupNodeList(this.gid).then(res => {
        //   this.productTreeList = res
        // })
        // console.log('这是组ID')
        // console.log(this.gid)
      })
      getGroupsList().then(res => {
        this.groupList = res.results
        // console.log(res.results)
      })
      getUserList({ page_size: 0 }).then(res => {
        this.userList = res
        // console.log(res)
      })
      // getProductTree().then(res => {
      //     this.productTreeList = res

      // 用来判断该显示哪个组对应的哪个业务节点树结构
      // const res = UserInfo()
      // const gid = res.groupsinfo[0].gid
      // console.log(gid)
      // this.gid = gid
      // getGroupNodeList(this.gid).then(res => {
      //   this.productTreeList = res
      // })
      // getProductLevel({ pid: 0, page_size: 0 }).then(res => {
      //   this.productLevel = [{ id: 0, service_name: '顶级' }].concat(res)
      // })
      getProductLevel2({ page_size: 0 }).then(res => {
        this.productLevel = [{ id: 0, service_name: '顶级' }].concat(res)
        console.log(this.productLevel)
      })
    },
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    fetchGroupData() {
      this.loading = true
      getGroupsList().then(res => {
        this.groupList = res.results
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    fetchServerListData() {
      this.loading = true
      getServerList({ page: this.serverListPage, server_purpose: this.server_purpose }).then(res => {
        // console.log(this.productForm.service_name)
        this.serverList = res.results
        this.serverListTotalNum = res.count
        this.serverListloading = false
      })
    },
    paginationChange(val) {
      this.serverListPage = val
      this.fetchServerListData()
    },
    editClicks(row) {
      if (this.$refs['changeServerForm'] !== undefined) {
        this.$refs['changeServerForm'].resetFields()
      }
      const { id, hostname, ip, status, env } = row
      // const { idc, service, server_purpose } = { idc: row.idc.id, service: row.service.id, server_purpose: row.server_purpose.id }
      this.changeServerForm = { id, hostname, ip, status, env }
      this.fetchServerListData()
      this.changeServerVisible = true
    },
    addkClick() {
      this.isFormVisible = true
      if (this.$refs['addForm'] !== undefined) {
        this.$refs['addForm'].resetFields()
      }
    },
    changechargetype() {
      // const chargetype = this.addcloudServerForm.ChargeType
      if (this.addForm.ChargeType === '按量付费') {
        delete this.addForm.PeriodUnit
        delete this.addRule.PeriodUnit
      }
      this.ShowPeriodUnit = this.addForm.ChargeType !== '按量付费'
      // if (this.addcloudServerForm.ChargeType && this.addcloudServerForm.cabinet) {
      //   this.ResMatsList2 = this.MemList
      // }
    },
    addClick() {
      this.productFlag = 'add'
      this.$refs['productForm'].resetFields()
      this.showForm = true
      this.showServerListTable = false
      this.disabled = false
      this.buttonDisabled = true
    },
    editClick() {
      this.productFlag = 'edit'
      this.disabled = false
      this.buttonDisabled = true
    },
    deleteClick() {
      this.$confirm('此操作将删除该业务线, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProductLevelInfo(this.productForm.id).then(() => {
          this.$message({
            message: '删除业务线成功',
            type: 'success'
          })
          this.showForm = false
          this.showServerListTable = false
          this.getProductTreeInfo()
        })
      }).catch(() => { })
    },
    KuorongForm() {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) {
          return
        }
        getServerList({ page: this.serverListPage, server_purpose: this.server_purpose }).then(res => {
          // console.log(res.results)
          const server = res.results[0]
          // this.addForm.idc = server.idc
          // this.addForm.cabinet = server.cabinet
          // this.addForm.env = server.env
          // this.addForm.service = server.service
          // this.addForm.server_purpose = server.server_purpose
          // this.addForm.ImageId = server.ImageId
          // this.addForm.InstanceType = server.InstanceType
          // this.addForm.SecurityGroupIds = server.SecurityGroupIds
          // this.addForm.VSwitchId = server.VSwitchId
          // for (const server of res.results) {
          // this.addForm.idc = server.idc
          // this.addForm.cabinet = server.cabinet
          // console.log(server)
          const arr = server.SecurityGroupIds.replace(/\[/g, '').replace(/\]/g, '').replace(/'/g, '').replace(/ /, '')
          arr.split(',').map((item) => {
            this.addForm.SecurityGroupIds.push(item)
          })
          const { idc, cabinet, service, server_purpose } = { idc: server.idc.id, cabinet: server.cabinet.id, service: server.service.id, server_purpose: server.server_purpose.id }
          const { env, ImageId, InstanceType, VSwitchId } = server
          // 下边这样写是覆盖以前的表单数据，是不对的，所以使用对象合并的方法
          // this.addForm = { idc, cabinet, env, service, server_purpose, ImageId, InstanceType, SecurityGroupIds, VSwitchId }
          this.addForm = { ...this.addForm, ...{ idc, cabinet, env, service, server_purpose, ImageId, InstanceType, VSwitchId }}
          // console.log(this.addForm)
          const params = Object.assign({}, this.addForm)
          // console.log(params)
          kuorongServer(params).then(res => {
            getServerList({ remark: params.remark }).then(res => {
              for (const server of res.results) {
                if (server.remark === params.remark) {
                  const { hostname, ip } = server
                  console.log(hostname, ip)
                  this.$message({
                    message: '扩容云资产' + '【' + hostname + '】' + '【' + ip + '】' + '成功',
                    type: 'success'
                  })
                }
              }
              // this.serverList = res.results
              // this.total_num = res.count
              // this.loading = false
            })
          }).catch(err => {
            console.log(err)
          })
          this.isFormVisible = false
          this.fetchData(Object.assign(this.productForm))
        })
        // const params = Object.assign({}, this.addForm)
        // kuorongServer(params).then(res => {
        //   console.log(params)
        //   // this.addcloudServerVisible = false
        //   this.fetchData()
        //   getServerList({ remark: params.remark }).then(res => {
        //     for (const server of res.results) {
        //       if (server.remark === params.remark) {
        //         const { hostname, ip } = server
        //         console.log(hostname, ip)
        //         this.$message({
        //           message: '扩容云资产' + '【' + hostname + '】' + '【' + ip + '】' + '成功',
        //           type: 'success'
        //         })
        //       }
        //     }
        //     this.serverList = res.results
        //     this.total_num = res.count
        //     this.loading = false
        //   })
        // }).catch(err => {
        //   console.log(err)
        // })
      })
    },
    submitClick() {
      this.$refs['productForm'].validate((valid) => {
        if (!valid) {
          return
        }
        if (this.productFlag === 'add') {
          const params = Object.assign({}, this.productForm)
          addProduct(params).then(res => {
            this.$refs['productForm'].resetFields()
            this.$message.success('添加业务线成功')
            this.showForm = true
            this.showServerListTable = true
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getProductTreeInfo()
          })
        } else {
          const id = this.productForm.id
          delete this.productForm.id
          const params = Object.assign({}, this.productForm)
          updateProduct(id, params).then(res => {
            this.$message.success('修改业务线成功')
            this.showForm = false
            this.showServerListTable = false
            this.disabled = true
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getProductTreeInfo()
          })
        }
      })
    },
    // getProductTreeInfo() {
    //   getProductTree().then(res => {
    //     this.productTreeList = res
    //   })
    // },
    // 异步等待获取完登录用户信息
    async getProductTreeInfo() {
      const userres = await UserInfo()
      // const gid = res.groupsinfo[0].gid
      // this.gid = gid
      // // console.log(gid)
      if (userres.is_superuser) {
        getProductTree().then(res => {
          // for (const product of res) {
          //   console.log(product)
          //   // if (product.children === []) {
          //   // }
          // }
          this.productTreeList = res
        })
      } else {
        this.userinfo = userres
        this.gid = userres.groupsinfo[0].gid
        getGroupNodeList(this.gid).then(res => {
          this.productTreeList = res
        })
      }
    },
    treeNodeClick(data) {
      // console.log(data)
      this.$refs['productForm'].resetFields()
      getProductLevelInfo(data.id).then(res => {
        const op_interface = []
        const dev_interface = []
        res.op_interface.forEach(item => {
          op_interface.push(item.id)
        })
        res.dev_interface.forEach(item => {
          dev_interface.push(item.id)
        })
        const { id, pid, module_letter, service_name } = res
        this.productForm = { id, pid, module_letter, service_name, op_interface, dev_interface }
        this.disabled = true
        this.buttonDisabled = false
        this.showForm = true
        if (pid === 0) {
          this.showServerListTable = false
        } else {
          this.serverListPage = 1
          this.server_purpose = data.id
          this.serverList = []
          this.fetchServerListData()
          this.showServerListTable = true
        }
      })
    },
    submitchangeServerClick() {
      this.$refs['changeServerForm'].validate((valid) => {
        if (!valid) {
          return
        }
        updateServer(this.changeServerForm.id, this.changeServerForm).then(res => {
          this.changeServerVisible = false
          this.fetchData(Object.assign(this.productForm))
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .filter-tree {
    margin-top: 20px;
  }
  .select {
    width: 100%;
  }
</style>


