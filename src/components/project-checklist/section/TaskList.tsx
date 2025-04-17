
import React from 'react';
import TaskItem from '../TaskItem';
import { ChecklistItem } from '@/types/task';

interface TaskListProps {
  section: {
    id: string;
    items: ChecklistItem[];
  };
  handleDeleteTask: (sectionId: string, taskId: string) => void;
  handleToggleTaskCompletion: (sectionId: string, taskId: string, completed: boolean) => void;
  handleUpdateTaskText: (sectionId: string, taskId: string, text: string) => void;
  setSelectedTask: (task: { sectionId: string; taskId: string } | null) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  section,
  handleDeleteTask,
  handleToggleTaskCompletion,
  handleUpdateTaskText,
  setSelectedTask
}) => {
  return (
    <div className="p-2 min-h-[100px]">
      {section.items.map((item, taskIndex) => (
        <TaskItem
          key={item.id}
          item={item}
          taskIndex={taskIndex}
          sectionId={section.id}
          handleDeleteTask={handleDeleteTask}
          handleToggleTaskCompletion={handleToggleTaskCompletion}
          handleUpdateTaskText={handleUpdateTaskText}
          setSelectedTask={setSelectedTask}
        />
      ))}
    </div>
  );
};
