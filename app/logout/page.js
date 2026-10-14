"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Logout(){
  const router = useRouter()
  useEffect(()=>{
    localStorage.removeItem("shopnest_token")
    localStorage.removeItem("shopnest_user")
    localStorage.removeItem("cart")
    alert("Logged out!")
    router.push("/login")
  },[router])

  return <div className="p-20 text-center font-bold">Logging out...</div>
}