export interface Task {
  id?: string;
  title: string;
  description: string;
  //image_url should be a string and optional with a default value of https://material.angular.io/assets/img/examples/shiba2.jpg
  image_url?: string;
  status: string;
}

export const createTask = (
  title: string,
  description: string,
  image_url: string = 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  status: string = 'todo'
): Task => ({
  title,
  description,
  image_url,
  status,
});
