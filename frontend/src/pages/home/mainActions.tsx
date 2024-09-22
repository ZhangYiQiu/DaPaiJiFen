import { useNavigate } from "react-router-dom";
import { ROOMS_API } from "../../apis/rooms";
import { useLoading } from "../../stores/loading";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions } from "@mui/material";
import { useImmer } from "use-immer";

interface CreateRoomProps { }

interface CreateRoomHandles {
  open: () => void;
}

const CreateRoom = forwardRef<CreateRoomHandles, CreateRoomProps>((_, ref) => {
  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  const [open, setOpen] = useImmer(false);

  const activate = useLoading((state) => state.activate);

  const navigate = useNavigate();
  const [passDest, setPassDest] = useState('')
  const createRoom = async () => {
    try {
      activate(true);
      const password = passDest;
      if(!password){
        alert("请输入密码")
        return;
      }
      const res = await ROOMS_API.CREATE_ROOM(password);
      navigate(`/rooms/${res.data.id}`);
    } catch {
      console.error("Failed to create room");
    } finally {
      activate(false);
    }
  };

  const loading = useLoading((state) => state.active);

  return (
    <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogTitle>确定创建房间吗</DialogTitle>
      <DialogContent className="flex flex-col space-y-4">
        <TextField
          autoFocus
          required
          margin="dense"
          id="pass"
          name="pass"
          label="密码"
          type="text"
          fullWidth
          variant="standard"
          onChange={e => {
            setPassDest(e.target.value)
          }}
        />
      </DialogContent>
      <DialogActions><Button
        variant="contained"
        color="success"
        onClick={createRoom}
        disabled={loading}
      >
        确定
      </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setOpen(false)}
          disabled={loading}
        >
          取消
        </Button></DialogActions>
    </Dialog>
  );
});

const MainActions = () => {
  const navigate = useNavigate();

  const toRoomList = () => {
    navigate("/rooms");
  };

  const loading = useLoading((state) => state.active);

  const CreateRoomRef = useRef<CreateRoomHandles>(null);

  return (
    <div className="w-full flex flex-col space-y-8">
      <CreateRoom ref={CreateRoomRef} />
      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={() => CreateRoomRef.current?.open()}
        disabled={loading}
      >
        创建房间
      </Button>
      <Button
        size="large"
        fullWidth
        variant="contained"
        onClick={toRoomList}
        disabled={loading}
      >
        房间列表
      </Button>
    </div>
  );
};

export default MainActions;
