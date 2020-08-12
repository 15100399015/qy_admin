<template>
  <div>
    <!-- 弹窗 -->
    <el-dialog
      v-el-drag-dialog
      title="创建影片"
      :visible.sync="dialogFormVisible"
      width="36%"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="width:100%;height:600px;overflow-x: scroll;">
        <!-- 视频信息 -->
        <el-form ref="form" :model="videoParam" size="small">
          <el-tabs v-model="activeName">
            <!-- 影片基本信息 -->
            <el-tab-pane label="影片信息" name="basic">
              <el-form-item label="分类">
                <el-cascader
                  placeholder="分类"
                  :options="paramOptions.type"
                  :value="videoParam.type_id"
                  clearable
                ></el-cascader>
              </el-form-item>
              <el-form-item label="标题" style="display:flex">
                <el-input v-model="videoParam.video_name" placeholder="请输入影片名称" />
              </el-form-item>
              <el-form-item label="推荐">
                <el-row :gutter="20">
                  <el-col :span="19">
                    <el-slider
                      v-model="videoParam.video_level"
                      :step="1"
                      :max="10"
                      :min="0"
                      show-stops
                      show-input
                    ></el-slider>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="审核">
                    <el-switch v-model="videoParam.status"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="锁定">
                    <el-switch v-model="videoParam.video_lock"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="完结">
                    <el-switch v-model="videoParam.video_isend"></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="副标" style="display:flex">
                    <el-input v-model="videoParam.video_sub" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="别名" style="display:flex">
                    <el-input v-model="videoParam.video_en" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="备注" style="display:flex">
                    <el-input v-model="videoParam.video_remarks" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="颜色" style="display:flex">
                    <div style="display:flex;">
                      <el-input v-model="videoParam.video_color" placeholder="请输入内容"></el-input>
                      <el-color-picker
                        v-model="videoParam.video_color"
                        show-alpha
                        style="margin-left:10px"
                      ></el-color-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="封面图">
                <el-row :gutter="10">
                  <el-col :span="13">
                    <el-input v-model="videoParam.video_pic" placeholder="请输入内容">
                      <template slot="prepend">URL</template>
                    </el-input>
                  </el-col>
                  <el-col :span="7">
                    <el-button type="success">预览</el-button>
                    <el-upload
                      style="display: inline-block; margin-left:10px"
                      action="https://jsonplaceholder.typicode.com/posts/"
                    >
                      <el-button type="primary">上传</el-button>
                    </el-upload>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="缩略图">
                <el-row :gutter="10">
                  <el-col :span="13">
                    <el-input v-model="videoParam.video_pic_thumb" placeholder="请输入内容">
                      <template slot="prepend">URL</template>
                    </el-input>
                  </el-col>
                  <el-col :span="7">
                    <el-button type="success">预览</el-button>
                    <el-upload
                      style="display: inline-block; margin-left:10px"
                      action="https://jsonplaceholder.typicode.com/posts/"
                    >
                      <el-button type="primary">上传</el-button>
                    </el-upload>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="海报图">
                <el-row :gutter="10">
                  <el-col :span="13">
                    <el-input v-model="videoParam.video_pic_slide" placeholder="请输入内容">
                      <template slot="prepend">URL</template>
                    </el-input>
                  </el-col>
                  <el-col :span="7">
                    <el-button type="success">预览</el-button>
                    <el-upload
                      style="display: inline-block; margin-left:10px"
                      action="https://jsonplaceholder.typicode.com/posts/"
                    >
                      <el-button type="primary">上传</el-button>
                    </el-upload>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="导演">
                    <el-input v-model="videoParam.video_director" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="编剧">
                    <el-input v-model="videoParam.video_writer" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="主演">
                    <el-input v-model="videoParam.video_actor" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="幕后">
                    <el-input v-model="videoParam.video_behind" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="总集数">
                    <el-input v-model="videoParam.video_total" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="连载数">
                    <el-input v-model="videoParam.video_serial" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="上映日期">
                    <el-date-picker
                      v-model="videoParam.video_pubdate"
                      type="date"
                      placeholder="选择日期"
                      style="max-width:100%"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="影片版本">
                    <el-input v-model="videoParam.video_version" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="上映年代">
                    <el-input v-model="videoParam.video_year" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="发行地区">
                    <el-input v-model="videoParam.video_area" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="对白语言">
                    <el-input v-model="videoParam.video_lang" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="关联视频">
                    <el-input v-model="videoParam.video_rel_vod" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="关联文章">
                    <el-input v-model="videoParam.video_rel_art" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="扩展分类">
                    <el-input v-model="videoParam.video_class" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="TAG">
                    <el-input v-model="videoParam.video_tag" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="节目周期">
                    <el-input v-model="videoParam.video_weekday" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="资源类别">
                    <el-input v-model="videoParam.video_state" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="视频时长">
                    <el-input v-model="videoParam.video_duration" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="豆瓣id">
                    <el-input v-model="videoParam.video_douban_id" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="豆瓣评分">
                    <el-input v-model="videoParam.video_douban_score" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="简介">
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="videoParam.video_blurb"
                ></el-input>
              </el-form-item>
              <el-form-item label="详细介绍">
                <br />
                <div style="padding:0 2px">
                  <tinymce v-model="videoParam.video_content" />
                </div>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="剧集" name="episodes">
              <!-- 预览播放弹框 -->
              <el-dialog width="30%" title="视频预览" :visible.sync="innerVisible" append-to-body></el-dialog>
              <el-form-item>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <el-select v-model="value" placeholder="播放器">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="18">
                    <el-button>反选</el-button>
                    <el-button type="primary">添加</el-button>
                    <el-button type="warning">修改</el-button>
                    <el-button type="danger">删除</el-button>
                    <el-button type="success">修改</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-table :data="tableData" size="mini">
                    <el-table-column type="selection" align="center" width="48"></el-table-column>
                    <el-table-column prop="date" label="剧集" width="110" align="center"></el-table-column>
                    <el-table-column prop="name" label="播放地址"></el-table-column>
                    <el-table-column prop="name" label="操作" width="180" align="center">
                      <el-button
                        type="success"
                        icon="el-icon-video-play"
                        circle
                        size="mini"
                        @click="innerVisible = true"
                      ></el-button>
                      <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
                      <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
                    </el-table-column>
                  </el-table>
                </el-row>
                <el-row>
                  <div style="height:18px" />
                  <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
                </el-row>
              </el-form-item>
              <el-divider></el-divider>
            </el-tab-pane>
            <el-tab-pane label="其他信息" name="other">
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="顶">
                    <el-input-number v-model="videoParam.video_up"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="踩">
                    <el-input-number v-model="videoParam.video_down"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-divider content-position="left">评分</el-divider>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="平均分">
                    <el-input-number v-model="videoParam.video_score"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="总评分">
                    <el-input-number v-model="videoParam.video_score_all"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="总评次">
                    <el-input-number v-model="videoParam.video_score_num"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-divider content-position="left">播放</el-divider>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="总播放">
                    <el-input-number v-model="videoParam.video_hits"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="月播放">
                    <el-input-number v-model="videoParam.video_hits_month"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="周播放">
                    <el-input-number v-model="videoParam.video_hits_week"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="日播放">
                    <el-input-number v-model="videoParam.video_hits_day"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
            <el-button>还原</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Tinymce from "@/components/Tinymce";
import MDinput from "@/components/MDinput";
import elDragDialog from "@/directive/el-drag-dialog"; // base on element-ui
import { addOneData } from "@/api/video";
export default {
  components: {
    Tinymce,
    MDinput,
  },
  directives: { elDragDialog },
  data() {
    return {
      innerVisible: false,
      tableData: [
        {
          date: "第一集",
          name: "王小虎",
        },
        {
          date: "第一集",
          name: "王小虎",
        },
        {
          date: "第一集",
          name: "王小虎",
        },
        {
          date: "第一集",
          name: "王小虎",
        },
      ],
      videoParam: {
        type_id: 0,
        type_id_1: 0,
        group_id: 0,
        video_name: "",
        video_sub: "",
        video_en: "",
        video_status: true,
        video_letter: "",
        video_color: "",
        video_tag: "",
        video_class: "",
        video_pic: "",
        video_pic_thumb: "",
        video_pic_slide: "",
        video_actor: "",
        video_director: "",
        video_writer: "",
        video_behind: "",
        video_blurb: "",
        video_remarks: "",
        video_pubdate: "",
        video_total: 0,
        video_serial: 0,
        video_weekday: "",
        video_area: "",
        video_lang: "",
        video_year: 0,
        video_version: "",
        video_state: "",
        video_isend: false,
        video_lock: false,
        video_level: 0,
        video_duration: 0,
        video_douban_id: 0,
        video_douban_score: 0,
        video_rel_vod: 0,
        video_rel_art: 0,
        video_content: "",
        video_play_url: "",
        video_down_url: "",
        video_hits: 0,
        video_hits_month: 0,
        video_hits_week: 0,
        video_hits_day: 0,
        video_score: 0,
        video_score_all: 0,
        video_score_num: 0,
        video_up: 0,
        video_down: 0,
        video_play_from: "",
        video_play_note: "",
        video_down_from: "",
        video_down_note: "",
        video_copyright: "",
      },
      paramOptions: {
        type: [
          {
            value: "dianying",
            label: "电影",
            children: [
              {
                value: "aiqingpian",
                label: "爱情片",
              },
              {
                value: "zhanzhengpian",
                label: "战争片",
              },
              {
                value: "lunlipian",
                label: "伦理片",
              },
            ],
          },
        ],
      },
      activeName: "basic",
      dialogFormVisible: true,
    };
  },
  methods: {
    onSubmit() {
      this.createVideo();
    },
    async createVideo() {
      console.log(this.videoParam);
      // const data = await addOneData(this.videoParam);
      // console.log(data);
    },
  },
};
</script>