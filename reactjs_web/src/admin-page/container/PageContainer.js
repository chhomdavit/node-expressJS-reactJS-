
import "./PageContainer.css"
import { Button, Input, Spin } from "antd"
import { isEmptyOrNull } from "../../util/service"

const PageContainer = ({
    pageTitle = "PageTitle",
    loading = false,
    btnRight = false,
    onClickBtnAddNew,
    children,

    search={
        title:"Name",
        size:"middle",
        allowClear:true
    },
    onSearch
}) => {

    return (
        <div>
            {/* header */}
            <div className="pageHeaderContainer">
                <div className="rowHeader">
                    <div style={{ 
                        textTransform:"uppercase",
                        fontWeight:"bold",
                        fontSize:"20px"
                     }}>{pageTitle}</div>

                    {search != null && <div className="filterContent">
                        <Input.Search
                            placeholder={search.title}
                            size={search.size}
                            onSearch={onSearch}
                            allowClear={search.allowClear}
                        />
                    </div>}
                </div>
                <div>
                    {!isEmptyOrNull(btnRight) &&
                        <Button type="primary" onClick={onClickBtnAddNew}>
                            {btnRight}
                        </Button>
                    }
                </div>
            </div>
            {/* body */}
            <Spin spinning={loading}>
                {children}
            </Spin>
        </div>
    )
}

export default PageContainer