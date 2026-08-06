class ApiResponse{

    
    static ok(res, massage, data = null){
        return res.status(200).json({
            success : true,
            massage,
            data
        })
    }


    static created(res, massage, data = null){
        return res.status(201).json({
            success : true,
            massage,
            data
        })
    }


    static noContent(res){
        return res.status(204).send();
    }
}