import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { db } from '@/utils/constant'
import { doc, updateDoc } from 'firebase/firestore'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.bio || "",
    skills: user?.skills || ""
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Reference to Firestore doc for this user
      const userRef = doc(db, "users", user.uid);

      // Update fields in Firestore
      await updateDoc(userRef, {
        fullname: input.fullname,
        email: input.email,
        phoneNumber: input.phoneNumber,
        bio: input.bio,
        skills: input.skills
      });

      // Update Redux store as well
      dispatch(setUser({
        ...user,
        fullname: input.fullname,
        email: input.email,
        phoneNumber: input.phoneNumber,
        bio: input.bio,
        skills: input.skills
      }));

      toast.success("Profile updated successfully ✅");
      setOpen(false);

    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="fullname" className="text-right">Name</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="phoneNumber" className="text-right">Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="bio" className="text-right">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="skills" className="text-right">Skills</Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {
                loading
                  ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>
                  : <Button type="submit" className="w-full my-4">Update</Button>
              }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileDialog
