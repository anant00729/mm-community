const db = require("../../../config/database");
const isEmpty = require("../../../utils/is-empty");

class Story {
  async addStory(
    title,
    content,
    cover_image,
    visit_count,
    read_time,
    created_at,
    updated_at,
    user_id,
    story_status,
    like_count
  ) {
    let q1 = `
    INSERT INTO public.story(
      title, 
      content, 
      cover_image, 
      visit_count, 
      read_time, 
      created_at, 
      updated_at, 
      user_id, 
      story_status,
      like_count
      )
      VALUES (
      (:title),
      (:content),
      (:cover_image),
      (:visit_count),
      (:read_time),
      (:created_at),
      (:updated_at),
      (:user_id),
      (:story_status),
      (:like_count)
    );`;

    try {
      let res_d = await db.query(q1, {
        replacements: {
          title,
          content: JSON.stringify(content),
          cover_image,
          visit_count,
          read_time,
          created_at,
          updated_at,
          user_id,
          story_status,
          like_count,
        },
      });
      return {
        status: true,
        message: "Story Added Successfully",
        data: res_d[0][0],
      };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async findStoryByStoryId(storyId) {
    let q1 = `SELECT
    a.id,
    a.user_id,
    u.name,
    u.profile_image,
    a.title,
    a.content,
    a.cover_image,
    a.like_count,
    a.visit_count,
    a.read_time,
    a.created_at,
    a.updated_at,
    a.story_status,
    u.email,
    u.type,
    u.profile_image,
    u.user_active
    FROM
    public.story a 
    INNER JOIN public.user u ON a.user_id = u.id WHERE a.id = (:id)`;
    try {
      let res_d = await db.query(q1, { replacements: { id: storyId } });
      if (res_d[0].length === 0) {
        return { status: false, message: "Story not Found" };
      } else {
        delete res_d[0][0].password;
        return { status: true, message: "Story Found", data: res_d[0][0] };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async findStoryByBannerImage(cover_image) {
    let q1 = `SELECT 
      *
      from story WHERE cover_image = (:cover_image)`;
    try {
      let res_d = await db.query(q1, { replacements: { cover_image } });
      if (res_d[0].length === 0) {
        return { status: true };
      } else {
        return { status: false, message: "Story aleady added" };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async findStoryAllStories(isForUser, pageLimit = 15, pageNumber = 1) {
    let skipCount = pageLimit * (pageNumber - 1);

    let q1 = `SELECT
      a.id,
      a.user_id,
      u.name,
      u.profile_image,
      a.title,
      a.content,
      a.cover_image
      FROM
      public.story a 
      INNER JOIN public.user u ON a.user_id = u.id ORDER BY a.id DESC LIMIT (:pageLimit) OFFSET (:skipCount);`;
    try {
      let res_d = await db.query(q1, {
        replacements: { pageLimit, skipCount },
      });
      if (res_d[0].length === 0) {
        return { status: false, message: "Stories not Found" };
      } else {
        return { status: true, message: "Stories Found", data: res_d[0] };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async incrementStoryCount(storyId, visit_count) {
    let q1 = `UPDATE public.story SET visit_count = (:visit_count) WHERE id = (:storyId);`;
    try {
      await db.query(q1, { replacements: { storyId, visit_count } });
      return { status: true, message: "Stories visit updated" };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async getStoryByUserId(user_id) {
    let q1 = `SELECT
    a.id,
    u.name,
    u.profile_image,
    a.title,
    a.content,
    a.cover_image
    FROM
    public.story a 
    INNER JOIN public.user u ON a.user_id = u.id WHERE a.user_id = (:user_id) ORDER BY a.id DESC;`;
    try {
      let res_d = await db.query(q1, { replacements: { user_id } });
      if (res_d[0].length === 0) {
        return { status: false, message: "Stories not Found" };
      } else {
        return { status: true, message: "Stories Found", data: res_d[0] };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async getPublishedStory() {
    let q1 = `SELECT 
    id,
    title,
    content,
    cover_image, 
    like_count,
    visit_count,
    read_time,
    created_at,
    updated_at,
    user_id,
    story_status
    FROM public.story where story_status = 1`;

    try {
      let res_d = await db.query(q1);
      if (res_d[0].length === 0) {
        return { status: false, message: "Stories not Found" };
      } else {
        return { status: true, message: "Stories Found", data: res_d[0] };
      }
    } catch (err) {
      return { status: false, message: err.message };
    }
  }

  async getPendingStories() {
    let q1 = `SELECT id,
    title, content,
    cover_image,
    like_count,
    visit_count,
    read_time,
    created_at,
    updated_at,
    user_id,
    story_status
    FROM public.story where story_status = -1`;

    try {
      let res_d = await db.query(q1);
      if (res_d[0].length === 0) {
        return { status: false, message: "Stories not Found" };
      } else {
        return { status: true, message: "Stories Found", data: res_d[0] };
      }
    } catch (err) {
      return { status: false, message: err.message };
    }
  }

  async publishStoryByID(storyId) {
    let q1 = `UPDATE public.story SET story_status=1 WHERE id=(:storyId)`;

    try {
      await db.query(q1, { replacements: { storyId } });

      return { status: true, message: "Story updated" };
    } catch (err) {
      return { status: false, message: err.message };
    }
  }

  async getAllPublishedStories(story_status) {
    let q1 = `SELECT id, title, content, cover_image, like_count, visit_count, read_time, created_at, updated_at, user_id, story_status
    FROM public.story WHERE story_status = (:story_status);`;
    try {
      let res_d = await db.query(q1, { replacements: { story_status } });
      // res_d[0] ---> actual
      // res_d[1] --->
      if (res_d[0].length === 0) {
        return { status: false, message: "Stories not Found" };
      } else {
        return { status: true, message: "Stories Found", data: res_d[0] };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}

module.exports = Story;
