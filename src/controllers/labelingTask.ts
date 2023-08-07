
import { LabelingImage, LabelingTask } from "@prisma/client";
import { LabelingTaskController } from "../types/controllers";
import labelingTasks from "../models/labelingTask";
import labelingImages from "../models/labelingImage";
import { unlink } from 'fs/promises';
import path from "path";


class LabelingTaskService implements LabelingTaskController {

  public constructor() {}

  public async createTask (task: LabelingTask) {
    try {
      return await labelingTasks.create({ data: task });
    } catch (err) {
      console.error(err)
    }
  };

  public async editTask(newTask: LabelingTask) {
    try {
      return await labelingTasks.update({
        where: {
          labelingTaskId: newTask.labelingTaskId,
        },
        data: newTask
      });
    } catch (err) {
      console.error(err);
    }
  };

  public async deleteTask(taskId: number) {
    try {
      const taskImages = await labelingImages.findMany({
        where: {
          labelingTaskLabelingTaskId: taskId,
        }
      })

      taskImages.forEach(async (image: LabelingImage) => {
        await unlink(path.join(__dirname, "../../", image.path))
      })

      return await labelingTasks.delete({ where: { labelingTaskId: taskId } })  
    } catch (err) {
      console.error(err)
    }
  };

  public async getPendingTasksOfUser(userId: number) {
    try {
      return await labelingTasks.findMany({
        where: {
          AND: [
            { userUserId: userId },
            { Status: "PENDING" },
          ]
        },
        include: {
          user: true,
        }
      });
    } catch (err) {
      console.error(err);
      return null
    }
  };

  public async uploadLabelingImages(images: LabelingImage[]) {
    try {
      return await labelingImages.createMany({
        data: images
      });
    } catch (err) {
      console.error(err);
    }
  }

  public async getAllPendingTasks() {
    try {
      return await labelingTasks.findMany({
        where: {
          Status: "PENDING"
        },
        include: {
          Images: true
        }
      })  
    } catch (err) {
      console.error(err)
      return null
    }
  }

  public async updateImagesLabel(updatedImages: LabelingImage[]) {
    try {
      const data: LabelingImage[] = []
      
      for await (const image of updatedImages ){
        data.push(await labelingImages.update({
          where: {
            imageId: image.imageId,
          },
          data: image,
        }));
      }

      return data
    } catch (err) {
      console.error(err)
      return null
    }
  }

  public async updateTaskStatusToDone(taskId: number) {
    try {
      return await labelingTasks.update({
        where: {
          labelingTaskId: taskId,
        },
        data: {
          Status: "DONE"
        }
      })
    } catch (err) {
      console.error(err)
      return null
    }
  }

}


export default LabelingTaskService;