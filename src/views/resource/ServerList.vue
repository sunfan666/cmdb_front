<template>
  <div>
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item>
        <el-select v-model="searchForm.idc" style="width: 150px">
          <el-option
            v-for="(item, index) in searchIdcsList"
            :key="index"
            :label="item.idc_name"
            :value="item.id"
            >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.cabinet" style="width: 150px">
          <el-option
            v-for="(item, index) in searchCabinetList"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.service" style="width: 150px">
          <el-option
            v-for="(item, index) in searchServiceIdList"
            :key="index"
            :label="item.service_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.server_purpose" style="width: 150px">
          <el-option
            v-for="(item, index) in searchServerPurposeList"
            :key="index"
            :label="item.service_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!--<el-input v-model="searchForm.hostname" placeholder="请输入主机名或IP地址" style="width: 180px"></el-input>-->
        <el-input placeholder="请输入主机名或IP地址" v-model="searchForm.hostname" @input="handQuery" @keyup.enter.native="searchClick">
          <el-button slot="append" icon="el-icon-search" @click="searchClick">搜索</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="24" :offset="12" class="text-right">
          <el-button type="primary" @click="addClick">添加机房机器</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="24" :offset="12" class="text-right">
          <el-button type="primary" @click="addcloudClick">创建云资产</el-button>
        </el-col>
      </el-form-item>
        <!-- 添加机器开始 -->
        <el-dialog title="添加机房机器" :visible.sync="isFormVisible">
          <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addRule">
            <el-form-item label="主机名" prop="hostname">
              <el-input v-model="addForm.hostname" maxlength=50 placeholder="请输入主机名"></el-input>
            </el-form-item>
            <el-form-item label="IP地址" prop="ip">
              <el-input v-model="addForm.ip" maxlength=50 placeholder="请输入IP地址"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 创建云上资产开始 -->
      <el-dialog title="创建云资产":visible.sync="addcloudServerVisible">
        <el-row>
          <el-col>
            <div class="item" :style="{color:'#F56C6C'}">
              <dir><el-tag type="danger">「请按照数字顺序选择或填写」</el-tag></dir>
            </div>
            <div class="item">
              <br>
            </div>
          </el-col>
        </el-row>
          <el-form ref="addcloudServerForm" :model="addcloudServerForm" label-width="120px" :rules="addcloudServerFormRules">
            <el-form-item label="1 付费方式" prop="ChargeType">
              <el-select v-model="addcloudServerForm.ChargeType" @change="changechargetype">
                <el-option
                  v-for="(item, index) in ChargeTypeList"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="ShowPeriodUnit" label="1.1 购买单位" prop="PeriodUnit">
              <el-select v-model="addcloudServerForm.PeriodUnit">
                <el-option
                  v-for="(item, index) in PeriodUnitList"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="2 地域" prop="idc">
              <el-select v-model="addcloudServerForm.idc" @change="changeIdc">
                <el-option
                  v-for="(item, index) in idcsList"
                  :key="index"
                  :label="item.idc_name"
                  :value="item.id"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="3 分区" prop="cabinet">
              <el-select v-model="addcloudServerForm.cabinet" @change="areaChange">
                <el-option
                  v-for="(item, index) in cabinetList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="4 CPU" prop="CPU">
              <el-select v-model="addcloudServerForm.CPU"  @change="cpuChange">
                <el-option
                  v-for="(item, index) in CPUList"
                  :key="index"
                  :label="item.cores"
                  :value="item.cores"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="5 Mem" prop="Mem">
              <el-select v-model="addcloudServerForm.Mem" @change="memChange">
                <el-option
                  v-for="(item, index) in MemList"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="6 规格" prop="InstanceType">
              <el-select v-model="addcloudServerForm.InstanceType">
                <el-option
                  v-for="(item, index) in InstanceTypeList"
                  :key="index"
                  :label="item.chinesename"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="7.1 镜像来源" prop="imageowner">
              <el-select v-model="addcloudServerForm.imageowner" @change="changeImageimageowner">
                <el-option
                  v-for="(item, index) in imageownerList"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="7.2 选择镜像" prop="image">
              <el-select v-model="addcloudServerForm.image" @change="changeImage">
                <el-option
                  v-for="(item, index) in imageList"
                  :key="index"
                  :label="item.image_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="Showdisk" label="7.3 创建数据盘" prop="datadisk" label-width="120px">
              <el-input v-model="addcloudServerForm.datadisk"
                        maxlength=50
                        datatype="n"
                        type="number"
                        placeholder="数据盘大小(数字类型)"></el-input>
            </el-form-item>
            <el-form-item label="8 VPC" prop="VpcId">
              <el-select v-model="addcloudServerForm.VpcId" @change="changeVpc">
                <el-option
                  v-for="(item, index) in VpcIdList"
                  :key="index"
                  :label="item.vpc_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="9 交换机" prop="VSwitchId">
              <el-select v-model="addcloudServerForm.VSwitchId">
                <el-option
                  v-for="(item, index) in VSwitchIdList"
                  :key="index"
                  :label="item.switch_name"
                  :value="item.id"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="10 安全组" prop="SecurityGroupId">
              <el-select multiple v-model="addcloudServerForm.SecurityGroupId">
                <el-option
                  v-for="(item, index) in SecurityGroupIdList"
                  :key="index"
                  :label="item.seg_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="实例描述" prop="Description">-->
              <!--<el-input v-model="addcloudServerForm.Description" maxlength=50 placeholder="请输入实例描述"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="11 环境" prop="env">
              <el-select v-model="addcloudServerForm.env">
                <el-option
                  v-for="(item, index) in envList"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="12 业务线" prop="service">
              <el-select v-model="addcloudServerForm.service" @change="changeService">
                <el-option
                  v-for="(item, index) in serviceIdList"
                  :key="index"
                  :label="item.service_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="13 应用名" prop="server_purpose">
              <el-select v-model="addcloudServerForm.server_purpose">
                <el-option
                  v-for="(item, index) in serverPurposeList"
                  :key="index"
                  :label="item.service_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="11 主机名" prop="hostname">-->
              <!--<el-input v-model="addcloudServerForm.hostname" maxlength=50 placeholder="请输入主机名"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="14 实例名称" prop="InstanceName">
              <el-input v-model="addcloudServerForm.InstanceName" maxlength=50 placeholder="请输入实例名称"></el-input>
            </el-form-item>
            <el-form-item label="15 备注" prop="remark">
              <el-input v-model="addcloudServerForm.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addcloudServerVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitaddcloudForm">确 定</el-button>
          </div>
        </el-dialog>
        <!-- /结束 -->
      <!--<el-form-item>-->
        <!--<el-button type="primary" @click="searchClick()">搜索</el-button>-->
      <!--</el-form-item>-->
    </el-form>
    <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          :data="serverList"
          border
          class="table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form  label-position="left" inline class="table-form-expand">
            <el-form-item label="实例 ID：">
              <span>{{ props.row.instance_id }}</span>
            </el-form-item>
            <el-form-item label="创建时间：">
              <span>{{ props.row.created_time }}</span>
            </el-form-item>
            <el-form-item label="创建者：">
              <span>{{ props.row.created_user ? props.row.created_user : '' }}</span>
            </el-form-item>
            <el-form-item label="最后更新者：">
              <span>{{ props.row.updated_user ? props.row.updated_user : '' }}</span>
            </el-form-item>
            <el-form-item label="制造商：">
              <span>{{ props.row.manufacturer.vendor_name }}</span>
            </el-form-item>
            <el-form-item label="服务器类型：">
              <span>{{ props.row.model_name.model_name }}</span>
            </el-form-item>
            <el-form-item label="SN：">
              <span>{{ props.row.sn }}</span>
            </el-form-item>
            <el-form-item label="操作系统：">
              <span>{{ props.row.os }}</span>
            </el-form-item>
            <el-form-item label="CPU型号：">
              <span>{{ props.row.cpu_model }}</span>
            </el-form-item>
            <el-form-item label="CPU核数：">
              <span>{{ props.row.cpu_core_count }}</span>
            </el-form-item>
            <el-form-item label="内存：">
              <span>{{ props.row.server_mem }}</span>
            </el-form-item>
            <el-form-item label="硬盘：">
              <span>{{ props.row.disk }}</span>
            </el-form-item>
            <!--<el-form-item label="uuid：">-->
              <!--<span>{{ props.row.uuid }}</span>-->
            <!--</el-form-item>-->
            <el-form-item label="更新时间：">
              <span>{{ props.row.updated_time }}</span>
            </el-form-item>
            <!--<el-form-item label="网卡列表">-->
              <!--<span>-->
                  <!--<div v-for="i in cardList">-->
                    <!--<span v-if=" i.host.id ==  props.row.id "> {{i.name + ' [' + i.mac+']'}}</span>-->
                      <!--<div v-for="j in ipList">-->
                        <!--<span v-if="i.host.id ==  props.row.id && i.id == j.device.id"> |👿 {{j.ip_addr}}</span>-->
                      <!--</div>-->
                  <!--</div>-->
              <!--</span>-->
            <!--</el-form-item>-->
            <el-form-item label="备注：">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="idc.name"
        label="机房"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
            prop="service.name"
            label="业务线"
            width="110"
            align="center">
      </el-table-column>
      <el-table-column
              prop="server_purpose.name"
              label="应用名"
              width="130"
              align="center">
      </el-table-column>
      <el-table-column
              prop="hostname"
              label="主机名"
              width="200"
              align="center">
      </el-table-column>
      <el-table-column
              prop="ip"
              label="IP地址"
              width="150"
              align="center">
      </el-table-column>
      <el-table-column
              prop="device_type.name"
              label="机型类型"
              width="100"
              align="center">
      </el-table-column>
      <el-table-column
              prop="env"
              label="环境"
              width="100"
              align="center">
      </el-table-column>
      <!--<el-table-column-->
              <!--prop="status"-->
              <!--label="状态"-->
              <!--width="100"-->
              <!--align="center">-->
      <!--</el-table-column>-->
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status==='Running'" style="color: green">运行中</span>
          <span v-else-if="scope.row.status==='Starting'" style="color: green">启动中</span>
          <span v-else-if="scope.row.status==='Stopping'" style="color: red">停止中</span>
          <span v-else-if="scope.row.status==='Stopped'" style="color: red">已停止</span>
          <span v-else style="color: red">未知异常</span>
        </template>
      </el-table-column>
      <el-table-column
              prop=""
              label="操作"
              width="200"
              align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editClick(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="flushClick(scope.row)">刷新</el-button>
          </template>
      </el-table-column>
    </el-table>
    <div class="text-center" v-show="total_num>=10">
      <el-pagination
              background
              @current-change="paginationChange"
              layout="total, prev, pager, next, jumper"
              :current-page.sync="page"
              :total="total_num">
      </el-pagination>
    </div>
    <el-dialog title="修改服务器" :visible.sync="changeServerVisible">
      <el-form ref="changeServerForm" :model="changeServerForm" label-width="70px" :rules="changeServerFormRules">
        <el-form-item label="主机名称" prop="hostname">
            <el-input v-model="changeServerForm.hostname" placeholder="请输入主机名称"></el-input>
        </el-form-item>
        <el-form-item label="实例ID" prop="instance_id">
          <el-input v-model="changeServerForm.instance_id" :disabled="true" placeholder="实例ID"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
            <el-input v-model="changeServerForm.ip" :disabled="true" placeholder="请输入IP地址"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input v-model="changeServerForm.status" :disabled="true" placeholder="实例状态"></el-input>
        </el-form-item>
        <!--<el-form-item label="状态" prop="status">-->
            <!--<el-select v-model="changeServerForm.status">-->
              <!--<el-option-->
                <!--v-for="(item, index) in statusList"-->
                <!--:key="index"-->
                <!--:label="item"-->
                <!--:value="item"-->
              <!--&gt;-->
              <!--</el-option>-->
            <!--</el-select>-->
          <el-form-item label="环境" prop="env">
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
        <el-form-item label="机房/云厂商" prop="idc">
          <el-select v-model="changeServerForm.idc" @change="changeIdc">
            <el-option
              v-for="(item, index) in idcsList"
              :key="index"
              :label="item.idc_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机柜/云分区" prop="cabinet">
          <el-select v-model="changeServerForm.cabinet">
            <el-option
              v-for="(item, index) in cabinetList"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务线" prop="service">
          <el-select v-model="changeServerForm.service" @change="changeService">
            <el-option
              v-for="(item, index) in serviceIdList"
              :key="index"
              :label="item.service_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用名" prop="server_purpose">
          <el-select v-model="changeServerForm.server_purpose">
            <el-option
              v-for="(item, index) in serverPurposeList"
              :key="index"
              :label="item.service_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
            <el-input v-model="changeServerForm.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="changeServerVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitchangeServerClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getServerList, addServer, addIdcServer, deleteServer, flushServer2,
  getIdcsList, getResMatsList, getVpcsList, getSwitchList, getSeGList, getimageList, getVpcsInfo, getInsTypes,
  getCabinetList, getProductLevel, updateServer, getNetworkDeviceList, getIpList, userInfo } from '@/api/resource'
export default {
  data() {
    return {
      Showdisk: false,
      ShowPeriodUnit: false,
      loading: false,
      isFormVisible: false,
      serverList: [],
      total_num: 0,
      page: 1,
      state: 0,
      searchForm: {
        hostname: '',
        idc: '',
        cabinet: '',
        service: '',
        server_purpose: '',
        'page': 1
      },
      idcsList: [],
      VpcIdList: [],
      cabinetList: [],
      VSwitchIdList: [],
      imageList: [],
      imageListOld: [],
      SecurityGroupIdList: [],
      CPUList: [],
      MemList: [],
      ResMatsList: [],
      InstanceTypeList: [],
      serviceIdList: [],
      cardList: [],
      ipList: [],
      searchCabinetList: [{ id: '', name: '所有机柜' }],
      searchServerPurposeList: [{ id: '', service_name: '所有产品线' }],
      serverPurposeList: [],
      addcloudServerVisible: false,
      changeServerVisible: false,
      flushServerVisible: false,
      envList: ['Product', 'Pre', 'Test', 'Dev'],
      imageownerList: ['self', 'system'],
      ChargeTypeList: ['按量付费', '包年包月'],
      PeriodUnitList: ['Week', 'Month'],
      addForm: {
        hostname: '',
        ip: '',
        created_user: '',
        updated_user: ''
      },
      addRule: {
        hostname: [
          { required: true, message: '请输入主机名', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '请输入IP地址', trigger: 'blur' }
        ]
      },
      changeServerForm: {
        id: '',
        instance_id: '',
        updated_user: '',
        hostname: '',
        ip: '',
        status: '',
        env: '',
        remark: '',
        idc: '',
        cabinet: '',
        VSwitchId: '',
        service: '',
        server_purpose: ''
      },
      addcloudServerForm: {
        // hostname: '',
        created_user: '',
        updated_user: '',
        env: '',
        datadisk: '',
        VpcId: '',
        SecurityGroupId: [],
        VSwitchId: '',
        InstanceName: '',
        // Description: '',
        image: '',
        imageowner: '',
        ChargeType: '',
        PeriodUnit: '',
        InstanceType: '',
        CPU: '',
        Mem: '',
        remark: '',
        idc: '',
        cabinet: '',
        service: '',
        server_purpose: ''
      },
      flushServerForm: {
        id: '',
        ip: ''
      },
      changeServerFormRules: {
        // status: [
        //   { required: true, trigger: 'blur', message: '请选择状态' }
        // ],
        env: [
          { required: true, trigger: 'blur', message: '请选择环境' }
        ],
        remark: [
          { required: true, trigger: 'change', message: '请养成填写备注的好习惯哈哈哈嗝儿~' }
        ],
        idc: [
          { required: true, trigger: 'blur', message: '请选择机房' }
        ],
        cabinet: [
          { required: true, trigger: 'blur', message: '请选择机柜' }
        ],
        service: [
          { required: true, trigger: 'change', message: '请选择业务线' }
        ],
        server_purpose: [
          { required: true, trigger: 'change', message: '请选择产品线' }
        ]
      },
      addcloudServerFormRules: {
        env: [
          { required: true, trigger: 'blur', message: '请选择环境' }
        ],
        VpcId: [
          { required: true, trigger: 'blur', message: '请选择VPC' }
        ],
        VSwitchId: [
          { required: true, trigger: 'blur', message: '请选择交换机' }
        ],
        InstanceType: [
          { required: true, trigger: 'blur', message: '请选择规格' }
        ],
        ChargeType: [
          { required: true, trigger: 'blur', message: '请选择付费方式' }
        ],
        PeriodUnit: [
          { required: true, trigger: 'blur', message: '请选择购买单位' }
        ],
        imageowner: [
          { required: true, trigger: 'blur', message: '请选择镜像来源' }
        ],
        image: [
          { required: true, trigger: 'blur', message: '请选择镜像' }
        ],
        CPU: [
          { required: true, trigger: 'blur', message: '请选择CPU' }
        ],
        Mem: [
          { required: true, trigger: 'blur', message: '请选择内存' }
        ],
        SecurityGroupId: [
          { required: true, trigger: 'blur', message: '请选择安全组' }
        ],
        remark: [
          { required: true, trigger: 'blur', message: '请养成填写备注的好习惯哈哈哈嗝儿~' }
        ],
        InstanceName: [
          { required: true, trigger: 'blur', message: '请输入实例名称' }
        ],
        // Description: [
        //   { required: true, trigger: 'blur', message: '请输入实例描述' }
        // ],
        idc: [
          { required: true, trigger: 'blur', message: '请选择机房' }
        ],
        cabinet: [
          { required: true, trigger: 'blur', message: '请选择机柜' }
        ],
        service: [
          { required: true, trigger: 'change', message: '请选择业务线' }
        ],
        server_purpose: [
          { required: true, trigger: 'change', message: '请选择产品线' }
        ]
      }
    }
  },
  // mounted() {
  //   flushServer(0)
  //   this.fetchData()
  // },
  computed: {
    searchIdcsList() {
      return [{ id: '', idc_name: '所有机房' }].concat(this.idcsList)
    },
    searchServiceIdList() {
      return [{ id: '', service_name: '所有业务线' }].concat(this.serviceIdList)
    }
  },
  watch: {
    // 'addcloudServerForm.cabinet': {
    //   deep: true,
    //   handler: function(newV, oldV) {
    //     const zoneid = this.addcloudServerForm.cabinet
    //     const vpc = this.addcloudServerForm.VpcId
    //     let list = []
    //     getSwitchList({ vpc: vpc, page_size: 0, zone: zoneid }).then(res => {
    //       // console.log(res)
    //       list = res.map(item => {
    //         // console.log(item)
    //         var switchzone = item.zone
    //         if (switchzone !== zoneid) {
    //           return { id: item.id, switch_name: item.name, disabled: true }
    //         } else {
    //           return { id: item.id, switch_name: item.name }
    //         }
    //       })
    //       // console.log(list)
    //       this.VSwitchIdList = list
    //     })
    //   }
    // },
    state() {
      getIdcsList({ page_size: 0 }).then(res => {
        this.idcsList = res.map(item => {
          var idcname = item.name
          if (idcname === '阿里云-华北2-北京') {
            return { id: item.id, idc_name: item.name }
          }
          return { id: item.id, idc_name: item.name, disabled: true }
        })
      })
      getResMatsList({ page_size: 0 }).then(res => {
        this.ResMatsList = res.map(item => {
          return { id: item.id, cores: item.cores, mems: item.mems }
        })
      })
      getVpcsList({ page_size: 0 }).then(res => {
        this.VpcIdList = res.map(item => {
          return { id: item.id, vpc_name: item.name }
        })
      })
      getimageList({ page_size: 0 }).then(res => {
        this.imageListOld = res.map(item => {
          return { id: item.id, image_name: item.name, imageowner: item.imageowner }
        })
      })
      getProductLevel({ pid: 0, page_size: 0 }).then(res => {
        this.serviceIdList = res.map(item => {
          return { id: item.id, service_name: item.service_name }
        })
        console.log(this.serviceIdList)
      })
      this.getaddUserInfo()
      this.fetchData()
      getNetworkDeviceList({ page_size: 0 }).then(res => {
        this.cardList = res
        // console.log(this.cardList)
      })
      getIpList({ page_size: 0 }).then(res => {
        this.ipList = res
      })
    },
    'addcloudServerForm.idc'(val) {
      this.cabinetList = []
      this.addcloudServerForm.cabinet = ''
      if (!val) {
        this.searchForm.cabinet = ''
        return
      }
      getCabinetList({ idc: val, page_size: 0 }).then(res => {
        this.cabinetList = this.cabinetList.concat(res.map(item => {
          return { id: item.id, name: item.name }
        }))
      })
    },
    // 'addcloudServerForm.imageowner'(val) {
    //   console.log(val)
    //   this.imageownerList = []
    //   if (!val) {
    //     this.addcloudServerForm.imageowner = ''
    //     return
    //   }
    // ({ imageowner: val }).then(res => {
    //     this.imageownerList = this.imageownerList.concat(res.map(item => {
    //       console.log(this.imageownerList)
    //       return { id: item.id, imageowner: item.imageowner }
    //     }))
    //   })
    // },
    'addcloudServerForm.VpcId'(val) {
      var zoneid = this.addcloudServerForm.cabinet
      this.VSwitchIdList = []
      this.SecurityGroupIdList = []
      this.addcloudServerForm.VSwitchId = ''
      this.addcloudServerForm.SecurityGroupId = []
      if (!val) {
        return
      }
      if (!zoneid) {
        return
      }
      getSwitchList({ vpc: val, page_size: 0, zone: zoneid }).then(res => {
        this.VSwitchIdList = this.VSwitchIdList.concat(res.map(item => {
          var switchzone = item.zone.id
          if (switchzone !== zoneid) {
            return { id: item.id, switch_name: item.name, disabled: true }
          } else {
            return { id: item.id, switch_name: item.name }
          }
        }))
      })
      getSeGList({ vpc: val, page_size: 0 }).then(res => {
        this.SecurityGroupIdList = this.SecurityGroupIdList.concat(res.map(item => {
          return { id: item.id, seg_name: item.name }
        }))
      })
    },
    'searchForm.idc'(val) {
      this.searchCabinetList = [{ id: '', name: '所有机柜' }]
      this.searchForm.cabinet = ''
      // if (!val) {
      //   this.searchForm.cabinet = ''
      //   return
      // }
      getCabinetList({ idc: val, page_size: 0 }).then(res => {
        this.searchCabinetList = this.searchCabinetList.concat(res.map(item => {
          return { id: item.id, name: item.name }
        }))
      })
    },
    'addcloudServerForm.service'(val) {
      // console.log(val)
      this.serverPurposeList = []
      if (!val) {
        this.addcloudServerForm.server_purpose = ''
        return
      }
      getProductLevel({ pid: val, page_size: 0 }).then(res => {
        console.log(res)
        let arr = []
        res.forEach(function(item) {
          arr = arr.concat(item)
        })
        arr.forEach(item => {
          this.serverPurposeList.push({ id: item.id, service_name: item.service_name })
        })
        // this.serverPurposeList = res.map(item => {
        //   return { id: item.id, service_name: item.service_name }
        // })
      })
    },
    'searchForm.service'(val) {
      // console.log(val)
      this.searchServerPurposeList = [{ id: '', service_name: '所有产品线' }]
      if (!val) {
        this.searchForm.server_purpose = ''
        return
      }
      getProductLevel({ pid: val, page_size: 0 }).then(res => {
        console.log(res)
        let arr = []
        res.forEach(function(item) {
          arr = arr.concat(item)
        })
        arr.forEach(item => {
          this.searchServerPurposeList.push({ id: item.id, service_name: item.service_name })
        })
        console.log(this.searchServerPurposeList)
      })
    },
    'changeServerForm.service'(val) {
      this.serverPurposeList = []
      if (!val) {
        this.changeServerForm.server_purpose = ''
        return
      }
      getProductLevel({ pid: val, page_size: 0 }).then(res => {
        console.log(res)
        let arr = []
        res.forEach(function(item) {
          arr = arr.concat(item)
        })
        arr.forEach(item => {
          this.serverPurposeList.push({ id: item.id, service_name: item.service_name })
        })
        // this.serverPurposeList = res.map(item => {
        //   return { id: item.id, service_name: item.service_name }
        // })
      })
      // console.log(this.serverPurposeList)
    },
    'changeServerForm.idc'(val) {
      if (!val) {
        this.changeServerForm.cabinet = ''
        return
      }
      getCabinetList({ idc: val, page_size: 0 }).then(res => {
        this.cabinetList = res.map(item => {
          return { id: item.id, name: item.name }
        })
      })
    }
  },
  created() {
    this.state = 1
  },
  methods: {
    // 获取created_user
    getaddUserInfo() {
      userInfo().then(response => {
        this.addForm.created_user = response.username
        this.addForm.updated_user = response.username
        this.addcloudServerForm.created_user = response.username
        this.addcloudServerForm.updated_user = response.username
      })
    },
    fetchData(params) {
      this.loading = true
      getServerList(params).then(res => {
        this.serverList = res.results
        this.total_num = res.count
        this.loading = false
      })
    },
    paginationChange(val) {
      this.searchForm.page = val
      this.fetchData(Object.assign(this.searchForm))
    },
    searchClick() {
      this.searchForm.page = 1
      this.fetchData(Object.assign(this.searchForm))
    },
    handQuery(event) {
      console.log(event.timestamp)
      this.params.page = 1
      this.fetchData()
    },
    changeIdc() {
      this.changeServerForm.cabinet = ''
    },
    changeImage() {
      this.changeServerForm.image = ''
    },
    changeImageimageowner() {
      this.imageList = this.imageListOld.filter((v) => {
        return v.imageowner === this.addcloudServerForm.imageowner
      })
      if (this.addcloudServerForm.imageowner === 'self') {
        delete this.addcloudServerForm.datadisk
      }
      this.Showdisk = this.addcloudServerForm.imageowner !== 'self'
    },
    changechargetype() {
      // const chargetype = this.addcloudServerForm.ChargeType
      if (this.addcloudServerForm.ChargeType === '按量付费') {
        delete this.addcloudServerForm.PeriodUnit
        delete this.addcloudServerFormRules.PeriodUnit
      }
      this.ShowPeriodUnit = this.addcloudServerForm.ChargeType !== '按量付费'
      // if (this.addcloudServerForm.ChargeType && this.addcloudServerForm.cabinet) {
      //   this.ResMatsList2 = this.MemList
      // }
    },
    changeVpc() {
      this.changeServerForm.VSwitchId = ''
    },
    changeService() {
      this.changeServerForm.server_purpose = ''
    },
    cpuChange() {
      // console.log(this.addcloudServerForm.CPU)
      // console.log(this.ResMatsList)
      this.ResMatsList.map((v) => {
        if (v.cores === this.addcloudServerForm.CPU) {
        // if (v.id === this.addcloudServerForm.CPU) {
          const arrNew = []
          const arr = v.mems.replace(/\[/g, '').replace(/\]/g, '')
          arr.split(',').map((item) => {
            arrNew.push(item)
          })
          this.MemList = arrNew
        }
      })
      // if (this.addcloudServerForm.ChargeType && this.addcloudServerForm.cabinet) {
      //   this.ResMatsList2 = this.MemList
      // }
    },
    memChange() {
      if (this.addcloudServerForm.ChargeType && this.addcloudServerForm.cabinet && this.addcloudServerForm.CPU && this.addcloudServerForm.Mem) {
        getInsTypes({
          page_size: 0,
          chargetype: this.addcloudServerForm.ChargeType === '按量付费' && 'PostPaid' || this.addcloudServerForm.ChargeType === '包年包月' && 'PrePaid',
          zone: this.addcloudServerForm.cabinet,
          cores: this.addcloudServerForm.CPU,
          mems: this.addcloudServerForm.Mem
        }).then((res) => {
          console.log(res)
          this.InstanceTypeList = res.map(item => {
            console.log(item)
            return { id: item.id, chinesename: item.chinesename }
          })
        })
      }
    },
    areaChange() {
      if (this.addcloudServerForm.ChargeType && this.addcloudServerForm.cabinet) {
        // console.log(this.addcloudServerForm.cabinet)
        getResMatsList({
          page_size: 0,
          chargetype: this.addcloudServerForm.ChargeType === '按量付费' && 'PostPaid' || this.addcloudServerForm.ChargeType === '包年包月' && 'PrePaid',
          zone: this.addcloudServerForm.cabinet
        }).then((res) => {
          // console.log(res)
          this.CPUList = res.map(item => {
            return { cores: item.cores, mems: item.mems }
          })
          // 对CPUList进行升序排序
          this.CPUList.sort(function(a, b) {
            return parseFloat(a.cores) - parseFloat(b.cores)
          })
        })
      }
    },
    addClick() {
      this.isFormVisible = true
      if (this.$refs['addForm'] !== undefined) {
        this.$refs['addForm'].resetFields()
      }
    },
    addcloudClick() {
      getVpcsInfo().then(() => {
        this.$message({
          message: '刷新 VPC Switch SEG Image InstanceType ResMatching 完成',
          type: 'success'
        })
      })
      if (this.$refs['addcloudServerForm'] !== undefined) {
        this.$refs['addcloudServerForm'].resetFields()
      }
      this.addcloudServerVisible = true
    },
    submitForm() {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) {
          return
        }
        const params = Object.assign({}, this.addForm)
        addIdcServer(params).then(res => {
          console.log(params)
          this.isFormVisible = false
          this.fetchData()
          this.$message({
            message: '添加' + params.hostname + '【' + params.ip + '】' + '成功',
            type: 'success'
          })
        }).catch(err => {
          console.log(err)
        })
      })
    },
    submitaddcloudForm() {
      this.$refs['addcloudServerForm'].validate((valid) => {
        if (!valid) {
          return
        }
        this.addcloudServerVisible = false
        const params = Object.assign({}, this.addcloudServerForm)
        addServer(params).then(res => {
          console.log(params)
          // this.addcloudServerVisible = false
          this.fetchData()
          getServerList({ remark: params.remark }).then(res => {
            for (const server of res.results) {
              if (server.remark === params.remark) {
                const { hostname, ip } = server
                console.log(hostname, ip)
                this.$message({
                  message: '添加云资产' + '【' + hostname + '】' + '【' + ip + '】' + '成功',
                  type: 'success'
                })
              }
            }
            this.serverList = res.results
            this.total_num = res.count
            this.loading = false
          })
        }).catch(err => {
          console.log(err)
        })
      })
    },
    async editClick(row) {
      if (this.$refs['changeServerForm'] !== undefined) {
        this.$refs['changeServerForm'].resetFields()
      }
      const { instance_id, id, hostname, ip, status, env, remark } = row
      const res = await userInfo()
      const updated_user = res.username
      // debugger
      const { idc, cabinet, service, server_purpose } = { idc: row.idc.id, cabinet: row.cabinet.id, service: row.service.id, server_purpose: row.server_purpose.id }
      this.changeServerForm = { instance_id, id, hostname, ip, updated_user, status, env, remark, idc, cabinet, service, server_purpose }
      this.changeServerVisible = true
    },
    flushClick(row) {
      if (this.$refs['flushServerForm'] !== undefined) {
        this.$refs['flushServerForm'].resetFields()
      }
      const { id, instance_id, ip } = row
      this.flushServerForm = { id, instance_id, ip }
      flushServer2(this.flushServerForm.id, this.flushServerForm).then(res => {
        this.flushServerVisible = false
        this.fetchData(Object.assign(this.searchForm))
        this.$message({
          message: '刷新' + '【' + row.ip + '】' + '成功',
          type: 'success'
        })
      })
      // 取消弹窗 this.flushServerVisible = true
    },
    deleteClick(row) {
      this.$confirm('是否删除 ' + row.hostname + '【' + row.ip + '】', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteServer(row.id).then(() => {
          this.$message({
            message: '删除服务器成功',
            type: 'success'
          })
          if (this.serverList.length === 1 && this.searchForm.page > 1) {
            this.searchForm.page = this.searchForm.page - 1
          }
          this.fetchData(Object.assign(this.searchForm))
        })
      }).catch(() => {
        this.$message({
          message: '您已取消删除服务器',
          type: 'success'
        })
      })
    },
    submitchangeServerClick() {
      this.$refs['changeServerForm'].validate((valid) => {
        if (!valid) {
          return
        }
        // this.getupdatedUserInfo()
        updateServer(this.changeServerForm.id, this.changeServerForm).then(res => {
          this.changeServerVisible = false
          this.fetchData(Object.assign(this.searchForm))
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.table-form-expand {
  font-size: 0;
  label {
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>



