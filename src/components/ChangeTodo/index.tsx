import { ChangeEvent, FC, FormEvent, useState } from 'react';
import styles from './ChangeTodo.module.scss';
import { CaseType, Todos } from './../../types/types';
import desc from './../../assets/images/description.svg';
import date from './../../assets/images/date.svg';
import statusImg from './../../assets/images/status.svg';
import priorityImg from './../../assets/images/priority.svg';
import tag from './../../assets/images/tag.svg';
import { useAppDispatch } from '../../app/store';
import { actions } from '../../app/todoReducer';

type PropsType = {
  todo: Todos;
  setEditMode: (value: boolean) => void;
};

const ChangeTodo: FC<PropsType> = ({ todo, setEditMode }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [status, setStatus] = useState(todo.status);
  //const [priority, setPriority] = useState(props.priority);
  //const [files, setFiles] = useState<null | string[]>(props.files);

  const dispatch = useAppDispatch();

  // const handleSelect = (e: PriorityType) => {
  // 	setPriority(e);
  // }
  // const handleFile = (e: FileList | null) => {
  // 	if (e) {
  // 		const arr: string[] = [];
  // 		for (let index = 0; index < e.length; index++) {
  // 			arr.push(e[index].name);
  // 		}
  // 		//setFiles([...arr]);
  // 	}
  // }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: Todos = {
      id: todo.id,
      title: title,
      status,
      description: description,
      dateCreated: todo.dateCreated,
      //priority,
      // 		runtime: props.runtime,
      dateOfDone: todo.dateOfDone,
      // 		comments: null,
      // 		files,
      // 		subtasks: props.subtasks,
    };
    dispatch(actions.changeTodo(body));
    //  dispatch(actions.rerenderApp()));
    setEditMode(false);
  };

  return (
    <div className={styles.popup}>
      <div className={styles.overlay} onClick={() => setEditMode(false)}></div>
      <div className={styles.wrapper}>
        <form onSubmit={e => handleSubmit(e)} className={styles.body}>
          <div className={styles.item}>
            <div className={styles.label}>
              <div className={styles.icon}>
                <img src={tag} alt="title" />
              </div>
              <span>Title:</span>
            </div>
            <input
              value={title}
              className={styles.title}
              onChange={e => setTitle(e.currentTarget.value)}
            />
          </div>
          <div className={styles.item}>
            <div className={styles.label}>
              <div className={styles.icon}>
                <img src={desc} alt="description" />
              </div>
              <span>Description:</span>
            </div>
            <textarea
              className={styles.description}
              value={description}
              onChange={e => setDescription(e.currentTarget.value)}
            />
          </div>
          <div className={styles.item}>
            <div className={styles.label}>
              <div className={styles.icon}>
                <img src={statusImg} alt="Status" />
              </div>
              <span>Status:</span>
            </div>
            <Status status={status} setStatus={setStatus} />
          </div>
          <div className={styles.item}>
            <div className={styles.label}>
              <div className={styles.icon}>
                <img src={date} alt="Date Created" />
              </div>
              <span>Date Created:</span>
            </div>
            <div className={styles.content}>{todo.dateCreated}</div>
          </div>
          {todo.dateOfDone && (
            <div className={styles.item}>
              <div className={styles.label}>
                <div className={styles.icon}>
                  <img src={date} alt="Date of done" />
                </div>
                <span>Date of done:</span>
              </div>
              <div className={styles.content}>{todo.dateOfDone}</div>
            </div>
          )}

          <div className={styles.item}>
            <div className={styles.label}>
              <div className={styles.icon}>
                <img src={priorityImg} alt="Priority" />
              </div>
              <span>Priority:</span>
            </div>
            {/* <div className={styles.content}>{props.priority}</div> */}
          </div>

          {/* <label htmlFor="priority" className={styles.item}>
						priority:
						<select id="priority"
							//value={props.}
							onChange={(e) => handleSelect(e.currentTarget.value)}
						>
							<option value='0' >low</option>
							<option value='1'>medium</option>
							<option value='2'>high</option>
						</select>
					</label>
					<label htmlFor="file" className={styles.item}>
						files:
						<input
							type="file"
							multiple
							id="file"
							onChange={(e) => handleFile(e.currentTarget.files)}
						/>
						{
							//files && files.map((f, i) => <span key={i}>{f} </span>)
						}
					</label> */}
          <button className="button">Change tusk</button>
        </form>
      </div>
    </div>
  );
};

export default ChangeTodo;

const Status: FC<PropsStatus> = ({ status, setStatus }) => {
  const handleChange = (value: ChangeEvent<HTMLSelectElement>) => {
    //@ts-ignore
    setStatus(value.currentTarget.value);
  };

  return (
    <>
      <select value={status} onChange={e => handleChange(e)}>
        <option value="queue">queue</option>
        <option value="development">development</option>
        <option value="completed">completed</option>
      </select>
    </>
  );
};

type PropsStatus = {
  status: CaseType;
  setStatus: (value: CaseType) => void;
};
