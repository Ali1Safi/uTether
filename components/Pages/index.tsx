import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "welcome"
  global.lang = { ff: "vr", ffb: " vb" }



  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>

      <br-x />
      <Window title={"قیمت تتر(دلار)"} style={{ minHeight: 600, opacity: "75%", backgroundRepeat: "no-repeat", margin: 10, width: "calc(100% - 20px)", backgroundColor: "#696969" }}>
        <pre>
          <div style={{ height: 420, textAlign:"center", marginRight:170 ,width: 340, marginBottom: 0, borderRadius: 20, marginTop: 50, background: "linear-gradient(230deg, #008000 20%, gainsboro 99%)" }} >

            <pre style={{ width: "100%", height: 50, borderRadius: 10, textAlign: "center", color: "black", opacity: "100%", float: "left" }}>
              <div style={{ width: 340, height: 50, textAlign:'center', color: "black", borderRadius: 20, backgroundColor: "#006400" }}>
                <br />
                <div style={{ opacity: "1000%", fontSize: 26, marginTop: -13 }}>
                  <img src="/tether.jpg" style={{ width: 30, float:"right", marginTop: 7, marginRight: 110, marginLeft: -130 }} />

                  تتر
                </div>

              </div>
              <br/>
              <div style={{display:'flex', flexDirection:'column', justifyContent:'space-evently', fontWeight:"bold" }}>
                <div>
                قیمت لحظه ای  : {(props.p.price as number).toLocaleString("fa-IR")}
                </div>
                <br/>
                <br/>
                <div>
                تغییر ۲۴ ساعته قیمت   :  ٪  {(parseFloat(props.p.diff24d) as number).toLocaleString("fa-IR")}
                </div>
                <br/>
                <br/>
                <div>
                تغییر قیمت ماه اخیر   :  ٪  {(parseFloat(props.p.diff30d) as number).toLocaleString("fa-IR")}
                </div>
                <br/>
                <br/>
                <div>
                تغییر قیمت هفته اخیر:  ٪  {(parseFloat(props.p.diff7d) as number).toLocaleString("fa-IR")}
                </div>
                <br/>
                <br/>
                <div>
                میانگین قیمت ۲۴ ساعت اخیر:    {(props.p.last24h as number).toLocaleString("fa-IR")}
                </div>
                <br/>
                <br/>
                <div>
                میانگین قیمت هفته اخیر:    {(props.p.last7d as number).toLocaleString("fa-IR")}
                </div>
                <br/>
                <br/>
                <div>
                میانگین قیمت ماه اخیر:    {(props.p.last30d as number).toLocaleString("fa-IR")}
                </div>

              </div>
              <br />
            </pre>
          </div>
          <div>
            <img src="/junior.jpg" alt="" style={{ height:180, float: "left", width:180, marginLeft:45, marginBottom:0, borderRadius:20, marginTop:-280}} />
          </div>
        </pre>
      </Window>
      <center style={{ backgroundColor: "#9400D3", color: "#00BFFF", margin: 40, borderRadius: 30 }}>
        تهیه توسط گروه جونیور
      </center>
    </div>
  )
}


export async function getServerSideProps(context) {

  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;


  let res = await fetch("https://api.tetherland.com/currencies")
  let data = await res.json()
  let p = data.data.currencies.USDT

  console.log("PRICEEEE:", p)




  return {
    props: {
      data: global.QSON.stringify({
        p,
        session,
        // nlangs,
      })
    },
  }
}