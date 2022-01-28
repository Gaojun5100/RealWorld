<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          v-model="comment.body"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img
          :src="user.image"
          class="comment-author-img"
        />
        <button
          class="btn btn-sm btn-primary"
          @click="addComments(article.slug)"
        >
          Post Comment
        </button>
      </div>
    </form>

    <div
      class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }"
        >
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
        <span
          v-if="comment.author.username==user.username"
          style="float:right;cursor:pointer;"
          @click="deleteComments(article.slug,comment.id)"
        ><i class="ion-trash-a"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComment, deleteComment } from '@/api/article'
import { mapState } from 'vuex'
export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      comments: [], // 文章列表,
      comment: {
        body: ''
      }
    }
  },
  watchQuery: ['article'],
  async mounted () {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async addComments (slug) {
      try {
        await addComment(slug, {
          comment: this.comment
        })
        // 刷新界面
        this.$router.push({ name: 'article', params: { slug: slug } })
      } catch (err) {
        // console.log('请求失败', err)
      }
    },
    async deleteComments (slug, id) {
      try {

        await deleteComment(slug, id)
        // 刷新界面
        this.$router.push({ name: 'article', params: { slug: slug } })
      } catch (err) {
        // console.log('请求失败', err)
      }
    }
  }
}
</script>

<style>
</style>
