
export default interface BlogPost {
  slug: string;
  content: string;
  date: string;
  description: string;
  title: string;
  author: {
    name: string;
    twitter: string;
  }
  og: {
    description: string;
    image: string;
  }
}

export const defaultBlogPost: BlogPost = {
  slug: '',
  content: '',
  date: '',
  title: '',
  description: '',
  author: {
    name: 'Corey O\'Donnell',
    twitter: 'motivatedwebdev'
  },
  og: {
    description: '',
    image: ''
  }
}
