export interface Tag {
  name: string;
}

export interface Project {
  id: string;
  imgUrl: string;
  tags: Tag[];
  desc: string;
}
