package com.hyl.controller;

import com.hyl.entity.Rooms;
import com.hyl.util.FileUploadUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

/**
 *   房屋控制器层
 */
@Controller
@RequestMapping("/rooms")
public class RoomsController extends BaseController<Rooms>{

    //房屋封面图的上传
  /*  @RequestMapping("/uploadRoomsPic")
    public @ResponseBody Map<String,Object> uploadRoomsPic(MultipartFile myFile, String path){
        return FileUploadUtil.upload(myFile,path);
    }*/

    //房屋封面图的上传
    @RequestMapping("/uploadRoomsPic")
    public @ResponseBody Map<String,Object> uploadRoomsPic(MultipartFile myFile,String path){
        System.out.println(myFile);
        return FileUploadUtil.upload(myFile,path);
    }
}
