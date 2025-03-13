import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    const initialPostsCount = postsService['posts'].length;
    
    const createdPost = postsService.create(post);
    
    expect(postsService['posts'].length).toBe(initialPostsCount + 1);
    
    expect(createdPost.text).toBe(post.text);
    
    expect(createdPost.id).toBeDefined();
    
    expect(createdPost.date).toBeDefined();
    
    expect(postsService['posts']).toContainEqual(createdPost);
  });

  it('should find a post', () => {
    const createdPost = postsService.create(post);
    
    const foundPost = postsService.find(createdPost.id);
    
    expect(foundPost).toBeDefined();

    if (foundPost) {
      expect(foundPost.id).toBe(createdPost.id);
      
      expect(foundPost.text).toBe(createdPost.text);

      expect(foundPost.date).toBe(createdPost.date);
    }
    

    expect(postsService.find('non-existent-id')).toBeUndefined();
  });
});