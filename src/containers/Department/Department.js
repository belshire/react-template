import React from 'react';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import DepartmentList from '../../components/DepartmentList/DepartmentList';
import SectionIcons from '../../components/SectionIcons/SectionIcons';

class Department extends React.Component {
  render() {
    return (
      <div>
        <DocumentMeta {...config.app}/>

        <SectionIcons {...this.props} />

        <DepartmentList {...this.props} />
      </div>
    );
  }
}

export default Department;
