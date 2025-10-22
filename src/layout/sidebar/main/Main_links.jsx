import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SidebarLinkContext } from '../../Layout';

export default function Main_links() {
    const link = useContext(SidebarLinkContext);
    return (
      <Link to={link?.path} className={link?.class}>{link?.icon}{link?.title}</Link>
    )
}
