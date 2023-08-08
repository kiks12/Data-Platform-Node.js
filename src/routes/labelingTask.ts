
import express, { Request, Response, Router } from "express"
import LabelingTaskController from "../controllers/labelingTask"
import multer from "multer"
import { LabelingImage, LabelingTask } from "@prisma/client"
import { authChecker } from "../middleware/authChecker"


const labelingTaskRouter: Router = express.Router()
const controller = new LabelingTaskController()


// CREATE MULTER INSTANCE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.originalname)
  }
})

const upload = multer({ storage: storage })




labelingTaskRouter
  .route("/")
  .get(authChecker, async (req: Request, res: Response) => {
    res.render("labeling/get") 
  })

labelingTaskRouter
  .route("/api/read")
  .get(async (req: Request, res: Response) => {
    const tasks = await controller.getAllPendingTasks()
    res.json(tasks)
  })

labelingTaskRouter
  .post("/api/create", upload.array("images"), async (req: Request, res: Response) => {
    try {
      const task = req.body as LabelingTask;
      task.Status = "PENDING"
      const createdTask = await controller.createTask(task)

      const images = (req.files as any[]).map((file: Express.Multer.File) => {
        return {
          name: file.originalname,
          path: file.path,
          labelingTaskLabelingTaskId: createdTask!.labelingTaskId,
        }
      })

      const uploaded = await controller.uploadLabelingImages(images as LabelingImage[])
      
      res.json({
        task: createdTask,
        images: uploaded
      });

    } catch (err) {
      console.error(err)
    }
  })


labelingTaskRouter
  .route("/api/:taskId")
  .get()
  .post()
  .delete(async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const deleted =  await controller.deleteTask(Number.parseInt(taskId)) 
      res.json(deleted)
    } catch (err) {
      console.error(err)
    } 
  })


labelingTaskRouter
  .route("/api/images")
  .put(async (req: Request, res: Response) => {
    try {
      const updatedImages = req.body as LabelingImage[]
      // console.log("Updated Images (req.body): ", updatedImages)
      const updated = await controller.updateImagesLabel(updatedImages)
      // console.log("Updated Images (db): ", updated)
      res.json(updated)
    } catch (err) {
      console.error(err)
    }
  })


labelingTaskRouter
  .route("/api/:taskId/done")
  .put(async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params
      const updatedTask = await controller.updateTaskStatusToDone(Number.parseInt(taskId))
      res.json(updatedTask)
    } catch(err) {
      console.error(err)
    }
  });


export default labelingTaskRouter;