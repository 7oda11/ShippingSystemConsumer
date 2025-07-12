import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleguardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if(!token) return false;
  try{

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRole = payload['role'];
    const router = inject(Router);

    // const requiredRole = route.data['role'] as string;
    // if(userRole === requiredRole){
    //   return true;
     const requiredRoles = route.data['roles'] as string[]; 
    if (requiredRoles?.includes(userRole)) {
      return true;
    } else {
      // alert('You are not authorized to access this page');
     router.navigate(['/unauthorized'])
      return false;
    }
  }catch(err){

    return false;
  }
};
