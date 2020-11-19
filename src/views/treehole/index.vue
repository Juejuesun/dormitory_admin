<template>
  <div>
    <a-alert message="树洞"></a-alert>

    <a-card hoverable style="width: 240px">
    <img
      alt="example"
      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
    />
    <a-card-meta title="Europe Street beat">
      <template v-slot:description>
        www.instagram.com
      </template>
    </a-card-meta>
  </a-card>

    <a-card hoverable style="width: 300px">
      <template #cover>
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      </template>
      <template class="ant-card-actions" #actions>
        <setting-outlined key="setting" />
        <edit-outlined key="edit" />
        <ellipsis-outlined key="ellipsis" />
      </template>
      <a-card-meta title="Card title" description="This is the description">
        <template #avatar>
          <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </template>
      </a-card-meta>
  </a-card>
  </div>  
</template>

<script>
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
export default {
  components: {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
  },
}
</script>

<style>

</style>