#Rscript diff.analysis.R <path to matrix file> <group one input colnames> <group two input colnames>> <output file prefix>
library("data.table")

Args=commandArgs(trailingOnly = TRUE)

#reading file
library(limma)
library(pheatmap)
zdf<-fread(Args[1],header=TRUE)
# zdf = read.table(Args[1],header=T,row.names = 1)
zdf=data.frame(zdf)

# arg1 = as.character(strsplit('GSM1359236_FaDu.shG9a.67.824.x,GSM277644',',')[[1]])
arg1 = as.character(strsplit(Args[2],',')[[1]])

# arg2 = as.character(strsplit('GSM1359236_FaDu.shG9a.67.824.x,GSM277644',',')[[1]])
arg2 = as.character(strsplit(Args[3],',')[[1]])


rpkm_data_1 = zdf[,arg1]
rpkm_data_2 = zdf[,arg2]
# write.table(df2,file = 'df2.txt')
# write.table(df2,file = 'df3.txt')

# rpkm_data_o_1 = cbind(df1,df2)
# rpkm_data_o_2 = cbind(df1,df3)

# fwrite(rpkm_data_o_1,file = 'df2.txt',sep = "\t",quote=FALSE)
# fwrite(rpkm_data_o_2,file = 'df3.txt',sep = "\t",quote=FALSE)

# rpkm_data_1=read.table('df2.txt',header=T,row.names = 1)
# rpkm_data_1=read.table('df3.txt',header=T,row.names = 1)

rpkm_data=cbind(rpkm_data_1,rpkm_data_2)

#computing diff gene
pheno=rbind(cbind(Status=0,sample=colnames(rpkm_data_1)),
            cbind(Status=1,sample=colnames(rpkm_data_2)))

rpkm_data=as.matrix(rpkm_data)
pheno=data.frame(pheno)
pheno$Status=as.factor(pheno$Status)
Group<-factor(pheno$Status,levels=levels(pheno$Status))
design<-model.matrix(~0+Group)

colnames(design)<-c("Group_one", "Group_two")

fit <-lmFit(rpkm_data,design)

cont.wt<-makeContrasts("Group_one-Group_two",levels=design)
fit2 <-contrasts.fit(fit,cont.wt)

fit3<-eBayes(fit2)
tempOutput = topTable(fit3, n=Inf,adjust="fdr")
DEG_voom = na.omit(tempOutput)
DEG_voom=cbind(rownames(DEG_voom),DEG_voom)

#making table
degene=DEG_voom[which(DEG_voom$adj.P.Val<0.05),]
colnames(degene)[1]="Gene"
degene=degene[order(degene$logFC,decreasing = T),]
degene$t=NULL
degene$B=NULL
write.table(degene,file = paste(Args[4],".table.txt",sep=""),row.names = F,col.names = T,quote = F)

print(degene)
#drawing heatmap
gene_exp_data=cbind(Gene=rownames(rpkm_data),rpkm_data)
de_gene_exp=merge(degene,gene_exp_data,by="Gene",all.x=T)
de_gene_exp=de_gene_exp[order(de_gene_exp[,2],decreasing = T),]
rownames(de_gene_exp)=de_gene_exp[,1]
de_gene_exp[,1:7]=NULL

i=1
while(i<=ncol(de_gene_exp)){
  de_gene_exp[,i]=as.numeric(as.character(de_gene_exp[,i]))
  i=i+1
}

annotation_col=data.frame(Sample_type=factor(rep(c("Group_one","Group_two"),c(ncol(rpkm_data_1),ncol(rpkm_data_2)))))
rownames(annotation_col)=colnames(rpkm_data)

png(filename = paste(Args[4],".heatmap.png",sep=""),width = 1200,height = 1000)
pheatmap(de_gene_exp,scale="row",color = colorRampPalette(c("green","black", "red"))(50),
         annotation_col = annotation_col,annotation_colors = list(Sample_type=c(Group_one="#BB3B29",Group_two="#0071B5"))[1],
         show_rownames = F,cluster_cols = F,cluster_rows = F,fontsize = 9)
dev.off()