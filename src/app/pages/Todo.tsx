import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { useAuth } from "../contexts/AuthContext";
import { Plus, Edit2, Trash2, Calendar as CalendarIcon, Tag, Smile, X, MoreVertical } from "lucide-react";

type Priority = 'low' | 'medium' | 'high';

interface TodoList {
  id: string;
  name: string;
  color: string;
  description: string;
  teamId: string;
  createdBy: string;
}

interface Task {
  id: string;
  listId: string;
  emoji?: string;
  title: string;
  priority: Priority;
  deadline?: string;
  completed: boolean;
  description: string;
  mentions: string[];
  createdBy: string;
  createdAt: string;
}

const LIST_COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Pink", value: "#EC4899" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Yellow", value: "#F59E0B" },
];

const COMMON_EMOJIS = [
  "📝", "✅", "🎯", "🔥", "💡", "📅", "🚀", "⭐", "💼", "📊",
  "🎨", "🔧", "📱", "💻", "📧", "📞", "🏠", "🍕", "✈️", "🎉",
  "❤️", "👍", "⚡", "🌟", "🎵", "📚", "🔔", "🎁", "🌈", "🔑"
];

const PRIORITY_CONFIG = {
  low: { label: "Low", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
  medium: { label: "Medium", color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" },
  high: { label: "High", color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
};

const mockLists: TodoList[] = [
  { id: "list-1", name: "Personal Tasks", color: "#3B82F6", description: "My personal to-do items", teamId: "team-1", createdBy: "user-1" },
  { id: "list-2", name: "Work Projects", color: "#8B5CF6", description: "Professional tasks and deadlines", teamId: "team-1", createdBy: "user-1" },
];

const mockTasks: Task[] = [
  { id: "task-1", listId: "list-1", emoji: "📝", title: "Review design mockups", priority: "high", deadline: "2026-03-23", completed: false, description: "Review the new dashboard designs from the team", mentions: ["user-2"], createdBy: "user-1", createdAt: "2026-03-22T09:00:00" },
  { id: "task-2", listId: "list-1", emoji: "✅", title: "Update documentation", priority: "medium", completed: true, description: "Update the API documentation with new endpoints", mentions: [], createdBy: "user-1", createdAt: "2026-03-21T14:00:00" },
  { id: "task-3", listId: "list-2", emoji: "🚀", title: "Deploy to production", priority: "high", deadline: "2026-03-22", completed: false, description: "Deploy the new version to production environment", mentions: ["user-2", "user-3"], createdBy: "user-2", createdAt: "2026-03-22T10:30:00" },
];

export function Todo() {
  const { userRole, user } = useAuth();
  const [lists, setLists] = useState<TodoList[]>(mockLists);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // List form state
  const [listDialogOpen, setListDialogOpen] = useState(false);
  const [editingList, setEditingList] = useState<TodoList | null>(null);
  const [listName, setListName] = useState("");
  const [listColor, setListColor] = useState(LIST_COLORS[0].value);
  const [listDescription, setListDescription] = useState("");

  // Task form state
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskEmoji, setTaskEmoji] = useState<string | undefined>(undefined);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState<Priority>("medium");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskMentions, setTaskMentions] = useState("");
  const [taskList, setTaskList] = useState(lists[0]?.id || "");

  const canCreate = userRole !== 'viewer';

  // List CRUD
  const handleCreateList = () => {
    if (!canCreate) return;
    const newList: TodoList = {
      id: `list-${Date.now()}`,
      name: listName,
      color: listColor,
      description: listDescription,
      teamId: "team-1",
      createdBy: user?.id || "user-1",
    };
    setLists([...lists, newList]);
    setListDialogOpen(false);
    resetListForm();
  };

  const handleUpdateList = () => {
    if (!canCreate || !editingList) return;
    setLists(lists.map((list) => list.id === editingList.id ? { ...list, name: listName, color: listColor, description: listDescription } : list));
    setListDialogOpen(false);
    resetListForm();
  };

  const handleDeleteList = (listId: string) => {
    if (!canCreate) return;
    if (confirm("Are you sure? This will delete the list and all its tasks.")) {
      setLists(lists.filter((list) => list.id !== listId));
      setTasks(tasks.filter((task) => task.listId !== listId));
      if (selectedList === listId) setSelectedList(null);
    }
  };

  const openEditList = (list: TodoList) => {
    setEditingList(list);
    setListName(list.name);
    setListColor(list.color);
    setListDescription(list.description);
    setListDialogOpen(true);
  };

  const resetListForm = () => {
    setEditingList(null);
    setListName("");
    setListColor(LIST_COLORS[0].value);
    setListDescription("");
  };

  // Task CRUD
  const handleCreateTask = () => {
    if (!canCreate) return;
    const newTask: Task = {
      id: `task-${Date.now()}`,
      listId: taskList,
      emoji: taskEmoji,
      title: taskTitle,
      priority: taskPriority,
      deadline: taskDeadline || undefined,
      completed: false,
      description: taskDescription,
      mentions: taskMentions ? taskMentions.split(",").map((m) => m.trim()) : [],
      createdBy: user?.id || "user-1",
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    setTaskDialogOpen(false);
    resetTaskForm();
  };

  const handleUpdateTask = () => {
    if (!canCreate || !editingTask) return;
    setTasks(tasks.map((task) =>
      task.id === editingTask.id
        ? { ...task, emoji: taskEmoji, title: taskTitle, priority: taskPriority, deadline: taskDeadline || undefined, description: taskDescription, mentions: taskMentions ? taskMentions.split(",").map((m) => m.trim()) : [], listId: taskList }
        : task
    ));
    setTaskDialogOpen(false);
    resetTaskForm();
  };

  const handleDeleteTask = (taskId: string) => {
    if (!canCreate) return;
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const handleToggleTask = (taskId: string) => {
    if (!canCreate) return;
    setTasks(tasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const openEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskEmoji(task.emoji);
    setTaskTitle(task.title);
    setTaskPriority(task.priority);
    setTaskDeadline(task.deadline || "");
    setTaskDescription(task.description);
    setTaskMentions(task.mentions.join(", "));
    setTaskList(task.listId);
    setTaskDialogOpen(true);
  };

  const resetTaskForm = () => {
    setEditingTask(null);
    setTaskEmoji(undefined);
    setTaskTitle("");
    setTaskPriority("medium");
    setTaskDeadline("");
    setTaskDescription("");
    setTaskMentions("");
    setTaskList(selectedList || lists[0]?.id || "");
    setShowEmojiPicker(false);
  };

  const filteredTasks = tasks
    .filter((task) => !selectedList || task.listId === selectedList)
    .filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (a.priority !== b.priority) return priorityOrder[a.priority] - priorityOrder[b.priority];
      if (a.deadline && b.deadline) return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      return 0;
    });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // ── Render helpers (plain functions, not components) ────────────────────────

  function renderListTabs(readOnly = false) {
    return (
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedList(null)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium flex-shrink-0 transition-colors border ${
            selectedList === null
              ? "bg-foreground text-background border-foreground"
              : "bg-card text-foreground border-border hover:bg-muted"
          }`}
        >
          <Tag className="size-3.5" />
          All Lists
        </button>

        {lists.map((list) => (
          <div key={list.id} className="flex items-center gap-0 flex-shrink-0 group/tab">
            <button
              onClick={() => setSelectedList(list.id === selectedList ? null : list.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border ${
                selectedList === list.id ? "text-white border-transparent" : "bg-card text-foreground border-border hover:bg-muted"
              } ${(!readOnly && canCreate) ? "rounded-xl rounded-r-none border-r-0" : "rounded-xl"}`}
              style={selectedList === list.id ? { backgroundColor: list.color, borderColor: list.color } : {}}
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: selectedList === list.id ? "white" : list.color }} />
              {list.name}
            </button>
            {!readOnly && canCreate && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`p-2 rounded-xl rounded-l-none border border-l-0 transition-colors opacity-0 group-hover/tab:opacity-100 ${
                      selectedList === list.id
                        ? "text-white/80 hover:text-white border-transparent"
                        : "text-muted-foreground hover:text-foreground border-border bg-card hover:bg-muted"
                    }`}
                    style={selectedList === list.id ? { backgroundColor: list.color } : {}}
                  >
                    <MoreVertical className="size-3.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openEditList(list)}>
                    <Edit2 className="size-3.5 mr-2" /> Edit List
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteList(list.id)}>
                    <Trash2 className="size-3.5 mr-2" /> Delete List
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ))}

        {!readOnly && canCreate && (
          <Dialog open={listDialogOpen} onOpenChange={setListDialogOpen}>
            <DialogTrigger asChild>
              <button
                onClick={resetListForm}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium flex-shrink-0 transition-colors border border-dashed border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Plus className="size-3.5" />
                New List
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingList ? "Edit List" : "Create List"}</DialogTitle>
                <DialogDescription>{editingList ? "Update list details" : "Add a new task list"}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="list-name">List Name</Label>
                  <Input id="list-name" value={listName} onChange={(e) => setListName(e.target.value)} placeholder="e.g., Work Tasks, Shopping" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="list-description">Description</Label>
                  <Textarea id="list-description" value={listDescription} onChange={(e) => setListDescription(e.target.value)} placeholder="What is this list for?" rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {LIST_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setListColor(color.value)}
                        className={`w-8 h-8 rounded-full border-2 transition-all flex-shrink-0 ${listColor === color.value ? "border-foreground scale-110" : "border-transparent hover:border-muted-foreground"}`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
                <Button onClick={editingList ? handleUpdateList : handleCreateList} className="w-full" disabled={!listName}>
                  {editingList ? "Update List" : "Create List"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  }

  // Viewer mode
  if (userRole === 'viewer') {
    return (
      <div className="min-h-full bg-background p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-foreground mb-1">To-Do</h1>
            <p className="text-muted-foreground">View team tasks and lists (read-only)</p>
          </div>
          {renderListTabs(true)}
          <Card>
            <CardContent className="pt-4">
              {filteredTasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No tasks found</p>
              ) : (
                <div className="space-y-2">
                  {filteredTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-3 border border-border rounded-xl">
                      {task.emoji && <span className="text-2xl leading-none">{task.emoji}</span>}
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.title}</p>
                        {task.description && <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>}
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge className={`${PRIORITY_CONFIG[task.priority].bgColor} ${PRIORITY_CONFIG[task.priority].color}`}>{PRIORITY_CONFIG[task.priority].label}</Badge>
                          {task.deadline && (
                            <Badge variant="outline" className="text-xs">
                              <CalendarIcon className="size-3 mr-1" />{formatDate(task.deadline)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Member, Admin, Owner modes
  return (
    <div className="min-h-full bg-background p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-foreground mb-1">To-Do</h1>
          <p className="text-muted-foreground">Manage your tasks and lists</p>
        </div>

        {/* List Tabs */}
        {renderListTabs()}

        {/* Tasks Main Area */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>
                  {selectedList ? lists.find((l) => l.id === selectedList)?.name : "All tasks"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 border border-border rounded-xl p-1 bg-muted">
                  {(['all', 'active', 'completed'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors capitalize ${
                        filter === f ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {canCreate && lists.length > 0 && (
                  <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={resetTaskForm}>
                        <Plus className="size-4 mr-2" />
                        Add Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{editingTask ? "Edit Task" : "Create Task"}</DialogTitle>
                        <DialogDescription>{editingTask ? "Update task details" : "Add a new task to your list"}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label>Emoji (optional)</Label>
                          <div className="flex items-center gap-2">
                            {taskEmoji ? (
                              <div className="flex items-center gap-2">
                                <span className="text-3xl">{taskEmoji}</span>
                                <Button variant="ghost" size="sm" onClick={() => setTaskEmoji(undefined)}><X className="size-4" /></Button>
                              </div>
                            ) : (
                              <Button variant="outline" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                <Smile className="size-4 mr-2" />Add Emoji
                              </Button>
                            )}
                          </div>
                          {showEmojiPicker && !taskEmoji && (
                            <div className="grid grid-cols-10 gap-1 p-2 border border-border rounded-xl bg-muted">
                              {COMMON_EMOJIS.map((emoji) => (
                                <button key={emoji} onClick={() => { setTaskEmoji(emoji); setShowEmojiPicker(false); }} className="text-2xl hover:bg-muted-foreground/20 rounded p-1 transition-colors">{emoji}</button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="task-title">Title</Label>
                          <Input id="task-title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task title" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="task-list">List</Label>
                          <Select value={taskList} onValueChange={setTaskList}>
                            <SelectTrigger id="task-list"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {lists.map((list) => (
                                <SelectItem key={list.id} value={list.id}>
                                  <span className="flex items-center gap-2">
                                    <span className="inline-block w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: list.color }} />{list.name}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="task-priority">Priority</Label>
                            <Select value={taskPriority} onValueChange={(v) => setTaskPriority(v as Priority)}>
                              <SelectTrigger id="task-priority"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="task-deadline">Deadline (optional)</Label>
                            <Input id="task-deadline" type="date" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="task-description">Description</Label>
                          <Textarea id="task-description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="Task details..." rows={3} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="task-mentions">Mentions (comma-separated user IDs)</Label>
                          <Input id="task-mentions" value={taskMentions} onChange={(e) => setTaskMentions(e.target.value)} placeholder="user-1, user-2" />
                        </div>
                        <Button onClick={editingTask ? handleUpdateTask : handleCreateTask} className="w-full" disabled={!taskTitle || !taskList}>
                          {editingTask ? "Update Task" : "Create Task"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <Tag className="size-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                <p className="text-muted-foreground mb-4">No tasks found</p>
                {canCreate && lists.length > 0 && (
                  <Button onClick={() => { resetTaskForm(); setTaskDialogOpen(true); }}>
                    <Plus className="size-4 mr-2" />Create First Task
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredTasks.map((task) => {
                  const list = lists.find((l) => l.id === task.listId);
                  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed;
                  return (
                    <div
                      key={task.id}
                      className={`flex items-start gap-3 p-3 border rounded-xl transition-colors ${
                        isOverdue ? 'border-destructive/30 bg-destructive/5' : 'border-border hover:bg-muted/50'
                      }`}
                    >
                      {canCreate && <Checkbox checked={task.completed} onCheckedChange={() => handleToggleTask(task.id)} className="mt-1" />}
                      {task.emoji && <span className="text-2xl leading-none mt-0.5">{task.emoji}</span>}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className={`font-medium text-sm ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.title}</p>
                            {task.description && <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>}
                          </div>
                          {canCreate && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="p-1 rounded hover:bg-muted text-muted-foreground flex-shrink-0"><MoreVertical className="size-3.5" /></button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEditTask(task)}><Edit2 className="size-3.5 mr-2" /> Edit Task</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteTask(task.id)}><Trash2 className="size-3.5 mr-2" /> Delete Task</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge className={`${PRIORITY_CONFIG[task.priority].bgColor} ${PRIORITY_CONFIG[task.priority].color} border ${PRIORITY_CONFIG[task.priority].borderColor} text-xs`}>
                            {PRIORITY_CONFIG[task.priority].label}
                          </Badge>
                          {task.deadline && (
                            <Badge variant="outline" className={`text-xs ${isOverdue ? 'border-destructive text-destructive' : ''}`}>
                              <CalendarIcon className="size-3 mr-1" />{formatDate(task.deadline)}{isOverdue && " (Overdue)"}
                            </Badge>
                          )}
                          {list && (
                            <Badge variant="outline" className="text-xs">
                              <span className="flex items-center gap-1">
                                <span className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: list.color }} />{list.name}
                              </span>
                            </Badge>
                          )}
                          {task.mentions.length > 0 && (
                            <Badge variant="outline" className="text-xs">{task.mentions.length} mention{task.mentions.length > 1 ? 's' : ''}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}