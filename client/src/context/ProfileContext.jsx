import { createContext, useContext, useEffect, useState } from 'react';
import { getProfile } from '../services/profileService.js';

const defaults={name:'Rafael Galvez',title:'BYD Sales Consultant',bio:'Your dedicated BYD Sales Consultant in Baliwag.',profile_photo:'/images/rafael-placeholder.svg',phone:'',email:'',facebook_url:'',address:'Baliwag, Bulacan, Philippines',map_url:''};
const ProfileContext=createContext(defaults);
export function ProfileProvider({children}){const[profile,setProfile]=useState(defaults);useEffect(()=>{getProfile().then(data=>setProfile({...defaults,...data})).catch(()=>{});},[]);return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>}
export const useProfile=()=>useContext(ProfileContext);
