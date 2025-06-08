export const Endpoints = {
  auth: {
    login: '/admin/auth/login',
  },
  media: {
    upload: '/media/upload',
    get: '/media/get',
  },
  user: {
    list: '/admin/user/list',
  },
  project: {
    list: '/project/list',
    create: '/admin/project/create',
    update: '/admin/project/update',
    remove: '/admin/project/remove',
  },
  blog: {
    list: '/blog/list',
    create: '/admin/blog/create',
    update: '/admin/blog/update',
    remove: '/admin/blog/remove',
  },
  blogComment: {
    list: '/blog-comment/list',
    create: '/admin/blog-comment/create',
    update: '/admin/blog-comment/update',
    remove: '/admin/blog-comment/remove',
  },
  category: {
    list: '/category/list',
    create: '/admin/category/create',
    update: '/admin/category/update',
    remove: '/admin/category/remove',
  },
  contact: {
    list: '/admin/contact/list',
    update: '/admin/contact/update',
    remove: '/admin/contact/remove',
  },
  duty: {
    list: '/duty/list',
    create: '/admin/duty/create',
    update: '/admin/duty/update',
    remove: '/admin/duty/remove',
  },
};
