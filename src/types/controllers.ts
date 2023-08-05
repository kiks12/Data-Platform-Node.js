
import { LabelingImage, LabelingTask, User } from "@prisma/client";

export interface IUserController {
  createUser: (user: User) => {}
  getUser: (email: string) => Promise<User | null>
}

export interface ILabelingTaskController {
  createTask: (task: LabelingTask) => {}
  uploadLabelingImages: (images: LabelingImage[]) => {}
  editTask: (newTask: LabelingTask) => {}
  deleteTask: (taskId: number) => {}
  getPendingTasksOfUser: (userId: number) => Promise<LabelingTask[] | null>
  getAllPendingTasks: () => Promise<LabelingTask[] | null>
  updateImagesLabel: (updatedImages: LabelingImage[]) => Promise<LabelingImage[] | null>
  updateTaskStatusToDone: (taskId: number) => Promise<LabelingTask | null>
}