import { Test, TestingModule } from '@nestjs/testing';
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
    // Получаем количество постов до создания нового
    const initialPostsCount = postsService['posts'].length;
    
    // Создаем новый пост
    const createdPost = postsService.create(post);
    
    // Проверяем, что количество постов увеличилось на 1
    expect(postsService['posts'].length).toBe(initialPostsCount + 1);
    
    // Проверяем, что созданный пост имеет правильный текст
    expect(createdPost.text).toBe(post.text);
    
    // Проверяем, что созданный пост имеет ID
    expect(createdPost.id).toBeDefined();
    
    // Проверяем, что созданный пост имеет дату
    expect(createdPost.date).toBeDefined();
    
    // Проверяем, что созданный пост добавлен в массив posts
    expect(postsService['posts']).toContainEqual(createdPost);
  });

  it('should find a post', () => {
    // Создаем новый пост
    const createdPost = postsService.create(post);
    
    // Ищем пост по ID
    const foundPost = postsService.find(createdPost.id);
    
    // Проверяем, что найденный пост не null и не undefined
    expect(foundPost).toBeDefined();
    
    // Проверяем остальные свойства только если foundPost определен
    if (foundPost) {
      // Проверяем, что найденный пост имеет тот же ID
      expect(foundPost.id).toBe(createdPost.id);
      
      // Проверяем, что найденный пост имеет тот же текст
      expect(foundPost.text).toBe(createdPost.text);
      
      // Проверяем, что найденный пост имеет ту же дату
      expect(foundPost.date).toBe(createdPost.date);
    }
    
    // Проверяем, что при поиске несуществующего ID возвращается undefined
    expect(postsService.find('non-existent-id')).toBeUndefined();
  });
});