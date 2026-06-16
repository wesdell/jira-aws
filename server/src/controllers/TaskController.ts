import type { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.query;

    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId)
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true
      }
    });

    res
      .status(200)
      .json(tasks)
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: `Error retireving tasks: ${error.message}`
      })
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      points,
      projectId,
      authorUserId,
      assignedUserId
    } = req.body;

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId
      }
    });

    res
      .status(201)
      .json(newTask)
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: `Error creating task: ${error.message}`
      })
  }
};
